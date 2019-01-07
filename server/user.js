const Router = require('koa-router')
const utils = require('utility')

const model = require('./model')

const User = model.getModel('user')
const router = new Router({
  prefix: '/user'
})
const _filter = {'pwd': 0, '_v': 0}

router.get('/list', async ctx => {
  const res = await User.find({})
  ctx.body = {
    res
  }
})

router.post('/login', async ctx => {
  const {user, pwd} = ctx.request.body
  const res = await User.findOne({user, pwd: md5Pwd(pwd)}, _filter)
  if (res) {
    ctx.body = {
      code: 0,
      res
    }
    ctx.cookies.set('userid', res._id)
  } else {
    ctx.body = {
      code: 1,
      msg: '用户名或密码错误'
    }
  }
})

router.post('/register', async ctx => {
  const {user, pwd, type} = ctx.request.body
  const res = await User.findOne({user: user})
  if (res) {
    ctx.body = {
      code: 1,
      msg: '用户名重复'
    }
  } else {
    const create = await User.create({user, pwd: md5Pwd(pwd), type})
    if (create) {
      ctx.body = {
        code: 0
      }
    } else {
      ctx.body = {
        code: 1,
        msg: '后端出错了'
      }
    }
  }
})

router.get('/info', async (ctx, next) => {
  const userid = ctx.cookies.get('userid')
  if (!userid) {
    ctx.body = {
      code: 1
    } 
  } else {
    const res = await User.findOne({_id: userid}, _filter)
    if (res) {
      ctx.body = {
        code: 0,
        res
      }
    } else {
      ctx.body = {
        code: 1,
        msg: '后端出错了'
      } 
    }
  }
})

function md5Pwd (pwd) {
  const salt = 'zhao_angus_666heiheihei!@#EEFRFdwd~'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = router