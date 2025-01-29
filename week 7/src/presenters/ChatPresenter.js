const Message = require('../models/message');

class ChatPresenter {
    static messages = [];

    static handleMessage(io, msg) {
        const newMessage = new Message(msg.user, msg.content);
        this.messages.push(newMessage);

        // Broadcast message to all connected clients
        io.emit('chatMessage', newMessage);
    }
}

module.exports = ChatPresenter;