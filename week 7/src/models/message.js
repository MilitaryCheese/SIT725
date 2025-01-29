class Message {
    constructor(user, content, timestamp = new Date()) {
        this.user = user;
        this.content = content;
        this.timestamp = timestamp;
    }
}

module.exports = Message;