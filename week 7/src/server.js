const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const ChatPresenter = require('./presenters/ChatPresenter');

// Middleware
app.use(express.static('public'));
app.use(express.json());

// API Routes
app.use('/api/chat', chatRoutes);

// Socket.io Connection
io.on('connection', (socket) => {
    console.log(`New user connected: ${socket.id}`);

    socket.on('chatMessage', (msg) => {
        ChatPresenter.handleMessage(io, msg);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));