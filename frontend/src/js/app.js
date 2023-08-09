import Chat from './Chat'

document.addEventListener('DOMContentLoaded', () => {
    const registerContainer = document.querySelector('.container')
    const chat = new Chat(registerContainer)
    chat.init()

    window.addEventListener('beforeunload', () => {
        const username = window.registerWidget.username

        if (username) {
            window.userApi.delete(username)
            window.webSocketApi.closeConnection()
        }
    })

    const eventSource = new EventSource('https://ahj-homeworks-sse-ws.onrender.com/sse/')

    eventSource.addEventListener('open', (e) => {
        console.log('sse open')
    })

    eventSource.addEventListener('error', (e) => {
        console.log('sse error')
    })

    eventSource.addEventListener('message', (e) => {
        const data = JSON.parse(e.data)

        if (data.method === 'addUser') {
            window.chatUsersWidget.addUser(data.username)
        } else if (data.method === 'removeUser') {
            window.chatUsersWidget.removeUser(data.username)
        }
    })
})
