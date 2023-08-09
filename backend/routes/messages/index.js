const Router = require('koa-router')
const { User } = require('../../db/db')

const router = new Router()

router.get('/messages/:username', (ctx) => {
    const { username } = ctx.params
    const user = User.allActiveUsers.find(user => user.username === username)
    if (!user) {
        ctx.response.body = { status: `no such user ${username}` }
        ctx.response.status = 404

        return
    }
    ctx.response.body = user.recievedMessages
    ctx.response.status = 200
})

router.post('/messages/:username', (ctx) => {
    const { username } = ctx.params
    const { recipient, text } = ctx.request.body
    const sender = User.allActiveUsers.find(user => user.username === username)
    const receiver = User.allActiveUsers.find(user => user.username === recipient)

    if (!sender) {
        ctx.response.body = { status: `no such user ${username}` }
        ctx.response.status = 404

        return
    }

    if (!sender) {
        ctx.response.body = { status: `no such user ${recipient}` }
        ctx.response.status = 404

        return
    }

    const data = sender.sendMessage(receiver, text)

    ctx.response.body = { data: JSON.stringify(data) }
    ctx.response.status = 201
})

module.exports = router
