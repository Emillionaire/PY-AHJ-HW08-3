import MessagesApi from './api/MessagesApi'

export default class ChatWindowWidget {
    constructor (container) {
        this.container = container
        this.messagesContainer = container.querySelector('.messages')
        this.inputContainer = container.querySelector('.messages__submit')
        this.messagesApi = new MessagesApi('https://ahj-homeworks-sse-ws.onrender.com')
        window.messagesApi = this.messagesApi
    }

    init () {
        this.setHandlers()
    }

    setHandlers () {
        this.inputContainer.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.inputContainer.value.trim()) {
                this.sendMessage(window.registerWidget.username, window.chatUsersWidget.currentRecipient.dataset.username, this.inputContainer.value)
            }
        })
    }

    openChat (sender, reciever) {
        this.container.style.display = 'flex'
        this.loadChat(sender, reciever)
    }

    loadChat (sender, reciever) {
        this.messagesContainer.remove()
        this.createMessagesContainer()

        const allMessages = []
        this.messagesApi.get(sender).then((data) => {
            if (data.status === 200) {
                if (data.data[reciever]) {
                    allMessages.push(...data.data[reciever])
                }
            }
        }).then(() => {
            this.messagesApi.get(reciever).then((data) => {
                if (data.status === 200) {
                    if (data.data[sender] && sender !== reciever) {
                        allMessages.push(...data.data[sender])
                    }
                }
            }).then(() => {
                const sortedMessages = allMessages.sort((a, b) => a.time - b.time)
                sortedMessages.forEach((messageData) => {
                    this.createMessage(messageData, sender)
                })
            })
        })
    }

    createMessagesContainer () {
        const ul = document.createElement('ul')
        ul.classList.add('messages')
        this.container.insertBefore(ul, this.inputContainer)

        this.messagesContainer = ul
    }

    createMessage (data, sender) {
        const li = document.createElement('li')
        li.classList.add('message')
        li.classList.add(sender === data.username ? 'sent' : 'recieved')

        const span = document.createElement('span')
        span.classList.add('info')
        if (data.username === window.registerWidget.username) {
            span.textContent = `You, ${new Date(data.time).toLocaleString()}`
        } else {
            span.textContent = `${data.username}, ${new Date(data.time).toLocaleString()}`
        }
        li.appendChild(span)

        const p = document.createElement('p')
        p.classList.add('text-message')
        p.textContent = data.text
        li.appendChild(p)

        this.messagesContainer.appendChild(li)
        this.messagesContainer.scrollTo(0, this.messagesContainer.scrollHeight)
    }

    sendMessage (sender, recipient, text) {
        this.messagesApi.post(sender, recipient, text).then((data) => {
            if (data.status === 201) {
                window.webSocketApi.sendMessage(data.data)
                this.inputContainer.value = ''
            }
        })
    }
}
