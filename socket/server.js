const { Server } = require('socket.io');

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

let users = [];

const addUser = (userData, socketId) => {
    // Check if the user with the same 'sub' already exists
    if (!users.some(user => user.sub === userData.sub)) {
        users.push({ ...userData, socketId });
    }
};

io.on('connection', (socket) => {
    socket.on('addUsers', (userData) => {
        addUser(userData, socket.id);
        io.emit('getUsers', users);
    });

    socket.on('sendMessage', (message) => {
        const receivingUser = users.find(user => user.sub === message.receiverId);
        const sendingUser = users.find(user => user.sub === message.senderId);

        if (receivingUser && receivingUser.socketId) {
            io.to(receivingUser.socketId).emit('getMessage', message);
        }
        if (sendingUser && sendingUser.socketId) {
            io.to(sendingUser.socketId).emit('getMessage', message);
        }
    });
});
