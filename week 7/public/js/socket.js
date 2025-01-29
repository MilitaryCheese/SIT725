const socket = io();
import ChatView from './chatView.js';

const userId = `User-${Math.floor(1000 + Math.random() * 9000)}`; // Generates a number between 1000-9999
console.log(`Assigned User ID: ${userId}`);


// Handle incoming messages
socket.on('chatMessage', (msg) => {
    ChatView.renderMessage(msg);
});

// Send message
document.getElementById('send-btn').addEventListener('click', () => {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();

    if (message) {
        socket.emit('chatMessage', { user: userId, content: message });
        messageInput.value = '';
    }
});