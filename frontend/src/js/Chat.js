import RegisterWidget from './RegisterWidget'
import ChatUsersWidget from './ChatUsersWidget'
import ChatWindowWidget from './ChatWindowWidget'

export default class Chat {
    constructor (container) {
        const chatWindowContainer = container.querySelector('.chat-window')
        this.chatWindowWidget = new ChatWindowWidget(chatWindowContainer)
        window.chatWindowWidget = this.chatWindowWidget

        const usersListContainer = container.querySelector('.users-list')
        this.chatUsersWidget = new ChatUsersWidget(usersListContainer, this.chatWindowWidget)
        window.chatUsersWidget = this.chatUsersWidget

        const registerContainer = container.querySelector('.register-window')
        this.registerWidget = new RegisterWidget(registerContainer)
        window.registerWidget = this.registerWidget
    }

    init () {
        this.registerWidget.init()
        this.chatUsersWidget.init()
        this.chatWindowWidget.init()
    }
}
