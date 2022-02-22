const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomTitle = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from url

const {username, roomName} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
})

const socket = io();

// parent.postMessage(JSON.stringify({key: 'value'}), '*');
//
// function handlerMessage(e) {
//     if (e.origin !== "http://itlogia.loc") {
//         return;
//     }
//     let data = e.data ? JSON.parse(e.data) : null;
//
//     if (data) {
//         outputMessage({
//             username: 'XXX',
//             message: 'Сообщение Вот такое',
//             text: 'ЧЧ:MM pm'
//         })
//     }
// }
//
//
// if (window.addEventListener) {
//     window.addEventListener('message', handlerMessage);
// } else {
//     window.attachEvent('message', handlerMessage);
// }

socket.emit('joinRoom', {username, roomName});

// Message from server
socket.on('allMessages', messages => {
    outputMessages(messages);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// Message from server
socket.on('message', message => {
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}

// Output message to DOM
function outputMessages(messages) {
    messages.forEach(message => {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;

        document.querySelector('.chat-messages').appendChild(div);
    })
}

// Add room name to DOM
function outputRoomName(room) {
    roomTitle.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    if (users) {
        userList.innerHTML = `
            ${users.map(user => `<li>${user.username}</li>`).join('')}
        `;
    }
}