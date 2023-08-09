import UserApi from './api/UserApi'
import WebSocketApi from './api/WebSocketApi'

export default class RegisterWidget {
    constructor (container) {
        this.container = container
        this.usernameInput = container.querySelector('.register-window__username')
        this.usernameForm = container.querySelector('.register-window__form')
        this.formError = container.querySelector('.register-window__error')
        this.userApi = new UserApi('https://ahj-homeworks-sse-ws.onrender.com')
        this.username = undefined
        window.userApi = this.userApi
    }

    init () {
        this.setHandlers()
    }

    setHandlers () {
        this.usernameForm.addEventListener('submit', (e) => {
            e.preventDefault()
            this.registerUser()
        })
    }

    registerUser () {
        const username = this.usernameInput.value.trim()
        if (!username) {
            this.formError.textContent = 'Username cannot be empty'
            this.formError.style.display = 'block'
            return
        } else if (username.includes(' ')) {
            this.formError.textContent = 'Username should not contain spaces'
            this.formError.style.display = 'block'
            return
        }
        this.username = username
        this.userApi.post(username).then(response => {
            if (response.status === 201) {
                this.container.style.display = 'none'
                this.formError.style.display = 'none'
                window.chatUsersWidget.container.style.pointerEvents = 'all'
                window.webSocketApi = new WebSocketApi(window.registerWidget.username)
            } else if (response.status === 400) {
                this.formError.textContent = 'This username is already taken'
                this.formError.style.display = 'block'
            } else {
                this.formError.textContent = 'Server error'
                this.formError.style.display = 'block'
            }
        })
    }
}
