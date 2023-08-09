const Router = require('koa-router')
const { User } = require('../../db/db')

const router = new Router()

router.get('/users', (ctx) => {
    const allUsers = User.allActiveUsers.map(user => user.username)

    ctx.response.status = 200
    ctx.response.body = { status: JSON.stringify(allUsers) }
})

router.post('/users', (ctx) => {
    const { username } = ctx.request.body

    if (User.allActiveUsers.some(user => user.username === username)) {
        ctx.response.status = 400
        ctx.response.body = { status: 'username is already taken' }

        return
    }

    const newUser = new User(username)
    User.addUser(newUser)

    ctx.response.status = 201
    ctx.response.body = { status: newUser }
})

router.delete('/users/:username', (ctx) => {
    const { username } = ctx.params

    if (User.allActiveUsers.every(user => user.username !== username)) {
        ctx.response.status = 400
        ctx.response.body = { status: 'username not found' }

        return
    }

    User.removeUser(username)

    ctx.response.status = 204
    ctx.response.body = { status: username }
})

module.exports = router
