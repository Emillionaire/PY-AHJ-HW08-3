export default class ChatUsersWidget {
    #currentUser

    constructor (container, chatWindowWidget) {
        this.container = container
        this.chatWindowWidget = chatWindowWidget
    }

    get currentRecipient () {
        return this.#currentUser
    }

    init () {
        this.initUsersList()
        this.setHandlers()
    }

    initUsersList () {
        window.userApi.get().then((data) => {
            if (data.status === 200 && data.data) {
                const allUsers = JSON.parse(data.data)
                allUsers.forEach(user => {
                    this.addUser(user)
                })
            }
        })
    }

    setHandlers () {
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('user-list__checkbox')) {
                this.#currentUser = e.target.closest('.user')
                this.openChat(e.target.closest('.user').dataset.username)
            }
        })
    }

    addUser (user) {
        const li = document.createElement('li')
        li.classList.add('user')
        li.dataset.username = user

        const checkbox = document.createElement('input')
        checkbox.type = 'radio'
        checkbox.name = 'users'
        checkbox.classList.add('user-list__checkbox')
        li.appendChild(checkbox)

        const username = document.createElement('span')
        username.classList.add('user-list__username')
        if (user === window.registerWidget.username) {
            username.textContent = 'You'
            username.style.color = 'rgb(197, 136, 22)'
        } else {
            username.textContent = user
        }
        li.appendChild(username)

        this.container.appendChild(li)
    }

    removeUser (user) {
        const item = this.container.querySelector(`[data-username='${user}']`)

        item.remove()
    }

    openChat (user) {
        this.chatWindowWidget.openChat(window.registerWidget.username, user)
    }
}
