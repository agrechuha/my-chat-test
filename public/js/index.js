const roomList = document.getElementById('room-name');

const socket = io();

socket.emit('indexPage');

socket.on('roomList', rooms => {
    outputRoomList(rooms);
});

function outputRoomList(rooms) {
    rooms.forEach((room => {
        const option = document.createElement('option');
        option.value = room.name;
        option.innerText = room.title;
        roomList.appendChild(option)
    }))
}