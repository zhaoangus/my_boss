const koa = require('koa')
const user = require('./user')
const app = new koa()

app.use(user.routes(), user.allowedMethods())

app.listen(9093)