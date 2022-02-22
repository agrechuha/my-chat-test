const db = require('./public/app/utils/connection');
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { formatMessage, formatDbMessage } = require('./public/app/utils/messages')
const {userJoin, getCurrentUser, userLeave, getRoomUsers, getRandomName} = require('./public/app/utils/users')
const UsersRepository = require('./public/app/repositories/UsersRepository');
const RoomsRepository = require('./public/app/repositories/RoomsRepository');
const MessagesRepository = require('./public/app/repositories/MessagesRepository');

const PORT = 3000 || process.env.PORT

db.connect('mongodb://127.0.0.1:27017', 'chat', function (err) {
    if (err) {
        return console.log(err);
    }

    const app = express();
    const server = http.createServer(app);
    const io = socketio(server)

    // Set static folder
    app.use(express.static(path.join(__dirname, 'public')));

    const botname = 'Чатбот';

    // Run when client connects
    io.on('connection', async socket => {
        const chatbot = await UsersRepository.findOneByFilter({username: 'chatbot'});

        socket.on('indexPage', async () => {
            let rooms = await RoomsRepository.findAll({})
            socket.emit('roomList', rooms);
        })

        socket.on('joinRoom', async ({username, roomName}) => {
            let user = await UsersRepository.findOneByFilter({username: username});
            if (!user) {
                user = await UsersRepository.create({username: username});
            }

            const room = await RoomsRepository.findOneByFilter({name: roomName});
            const messagesFromDb = await MessagesRepository.findAll({room: room._id});
            const messages = [];

            if (messagesFromDb) {
                messagesFromDb.forEach((message) => {
                    messages.push(formatDbMessage(message))
                });
            }

            if (messages.length) {
                socket.emit('allMessages', messages);
            }


            user = userJoin(socket.id, user.username, room.name)
            socket.join(room.name);

            // Welcome current user
            socket.emit('message', formatMessage(chatbot.username, user.username + ', добро пожаловать в чат'));

            // Broadcast when a user connects
            socket.broadcast.to(room.name).emit('message', formatMessage(botname, `${user.username} подключился к чату`));

            // Send users and room info
            io.to(room.name).emit('roomUsers', {
                room: room.title,
                users: getRoomUsers(room.name)
            })
        })

        // Listen for chatMessage
        socket.on('chatMessage', async (msg) => {
            const user = getCurrentUser(socket.id)
            let userFromDb = await UsersRepository.findOneByFilter({ username: user.username });
            let roomFromDb = await RoomsRepository.findOneByFilter({ name: user.room });
            let message = await MessagesRepository.create({
                user: userFromDb._id,
                room: roomFromDb._id,
                message: msg,
            });

            if (message) {
                io.to(user.room).emit('message', formatMessage(user.username, message.message))
            }
        })

        // Runs when client disconnects
        socket.on('disconnect', async () => {
            const user = userLeave(socket.id)

            if (user) {
                io.to(user.room).emit('message', formatMessage(botname, `${user.username} покинул чат`));
                const room = await RoomsRepository.findOneByFilter({name: user.room});
                // Send users and room info
                io.to(user.room).emit('roomUsers', {
                    room: room.title,
                    users: getRoomUsers(user.room)
                })
            }
        })
    })

    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

