const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const user = require('./user')

const app = new koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

io.on('connection', function (socket) {
  // console.log('user login')
  socket.on('sendmsg', function (data) {
    console.log(data)
    io.emit('recvmsg', data)
  })
})

app.use(bodyParser())
app.use(json())

app.use(user.routes(), user.allowedMethods())

server.listen(9093)