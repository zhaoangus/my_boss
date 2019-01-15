const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const user = require('./user')
const model = require('./model')

const Chat = model.getModel('chat')

const app = new koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, function (err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(bodyParser())
app.use(json())

app.use(user.routes(), user.allowedMethods())

server.listen(9093)