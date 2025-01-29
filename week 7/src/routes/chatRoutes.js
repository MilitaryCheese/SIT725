const express = require('express');
const ChatPresenter = require('../presenters/ChatPresenter');

const router = express.Router();

// Fetch all previous chat messages
router.get('/messages', (req, res) => {
    res.json({ messages: ChatPresenter.messages });
});

// Clear all chat messages (for debugging purposes)
router.delete('/messages', (req, res) => {
    ChatPresenter.messages = []; // Reset chat history
    res.json({ message: 'Chat history cleared.' });
});

module.exports = router;