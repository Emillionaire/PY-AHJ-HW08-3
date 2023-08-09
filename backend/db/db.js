const listeners = []
class Listeners {
    static listen (handler) {
        listeners.push(handler)
    }
}

let allActiveUsers = []
class User {
    constructor (username) {
        this.username = username
        this.recievedMessages = {}
    }

    static get allActiveUsers () {
        return allActiveUsers
    }

    sendMessage (user, text) {
        const message = new Message(this.username, text)
        if (Object.keys(user.recievedMessages).includes(this.username)) {
            user.recievedMessages[this.username].push(message)
        } else {
            user.recievedMessages[this.username] = [message]
        }

        return {
            reciever: user.username,
            message
        }
    }

    static addUser (user) {
        allActiveUsers.push(user)

        listeners.forEach(handler => handler({
            username: user.username,
            method: 'addUser'
        }))
    }

    static removeUser (username) {
        allActiveUsers = allActiveUsers.filter(user => user.username !== username)

        listeners.forEach(handler => handler({
            username,
            method: 'removeUser'
        }))
    }
}

class Message {
    constructor (username, text) {
        this.username = username
        this.text = text
        this.time = Date.now()
    }
}

module.exports = { User, Listeners }
