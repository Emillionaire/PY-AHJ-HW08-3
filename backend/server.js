const http = require('http')
const Koa = require('koa')
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const WS = require('ws')

const app = new Koa()
const router = require('./routes')

app.use(cors())

app.use(koaBody({
    // urlencoded: true,
    multipart: true
}))

app.use(router())

const port = process.env.PORT || 7070
const server = http.createServer(app.callback())

const wsServer = new WS.Server({
    server
})

wsServer.on('connection', (ws) => {
    ws.on('message', (e) => {
        Array.from(wsServer.clients).filter(client => client.readyState === WS.OPEN).forEach(client => client.send(e.toString()))
    })
})

server.listen(port)
