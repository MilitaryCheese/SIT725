class ChatView {
    static renderMessage(msg) {
        const chatBox = document.getElementById('chat-box');

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${msg.user}:</strong> ${msg.content}`;

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    }
}

export default ChatView;