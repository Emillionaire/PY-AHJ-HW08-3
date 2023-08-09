export default class WebSocketApi {
    constructor (sender) {
        this.sender = sender
        this.ws = undefined
        this.openConnection()
    }

    openConnection () {
        this.ws = new WebSocket('wss://ahj-homeworks-sse-ws.onrender.com/')
        this.ws.sender = this.sender

        this.ws.addEventListener('open', (e) => {
            console.log('ws open')
        })

        this.ws.addEventListener('close', (e) => {
            console.log('ws close')
        })

        this.ws.addEventListener('error', (e) => {
            console.log('ws error')
        })

        this.ws.addEventListener('message', (e) => {
            if (window.chatUsersWidget.currentRecipient) {
                const data = JSON.parse(JSON.parse(e.data).data)
                const userSet = new Set([window.registerWidget.username, window.chatUsersWidget.currentRecipient.dataset.username])
                const messageSet = new Set([data.message.username, data.reciever])
                const difference1 = Array.from(userSet).filter(el => !Array.from(messageSet).includes(el))
                const difference2 = Array.from(messageSet).filter(el => !Array.from(userSet).includes(el))

                if (difference1.length === 0 && difference2.length === 0) {
                    window.chatWindowWidget.createMessage(data.message, window.registerWidget.username)
                }
            }
        })
    }

    sendMessage (data) {
        this.ws.send(JSON.stringify({ data }))
    }

    closeConnection () {
        if (this.ws) {
            this.ws.close()
        }
        this.ws = undefined
    }
}
