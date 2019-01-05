const Router = require('koa-router')

const router = new Router({
  prefix: '/user'
})

router.get('/info', (ctx, next) => {
  ctx.body = {
    code: 1
  }
})

module.exports = router