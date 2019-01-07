const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const user = require('./user')

const app = new koa()

app.use(bodyParser())
app.use(json())

app.use(user.routes(), user.allowedMethods())

app.listen(9093)