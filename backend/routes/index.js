const combineRouters = require('koa-combine-routers')

const users = require('./users')
const messages = require('./messages')
const sse = require('./sse')

const router = combineRouters(users, messages, sse)

module.exports = router
