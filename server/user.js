const Router = require('koa-router')
const utils = require('utility')

const model = require('./model')

const User = model.getModel('user')
const Chat = model.getModel('chat')
const router = new Router({
  prefix: '/user'
})
const _filter = {'pwd': 0, '_v': 0}

router.get('/list', async ctx => {
  const type = ctx.request.query.type
  const res = await User.find({type})
  if (res) {
    ctx.body = {
      code: 0,
      res
    }
  }
})

router.get('/getmsglist', async ctx => {
  const user = ctx.cookies.get('userid')
  const userdoc = await User.find({})
  if (userdoc) {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })
    const chat = await Chat.find({'$or': [{from: user}, {to: user}]})
    if (chat) {
      ctx.body = {
        code: 0,
        msgs: chat,
        users
      }
    } else {
      ctx.body = {
        code: 1
      }
    }
  }
})

router.post('/update', async ctx => {
  const userid = ctx.cookies.get('userid')
  if (userid) {
    const find = await User.findByIdAndUpdate(userid, ctx.request.body)
    const res = Object.assign({}, {
      user: find.user,
      type: find.type
    }, ctx.request.body)
    ctx.body = {
      code: 0,
      res
    }
  } else {
    ctx.body = {
      code: 1
    }
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
    ctx.cookies.set('userid', res._id, {
      maxAge:1000 * 60 * 60,
      httpOnly: false
    })
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
    const userModel = new User({user, pwd: md5Pwd(pwd), type})
    const save = await userModel.save()
    if (save) {
      const { user, type, _id } = save
      ctx.cookies.set('userid', _id, {
        maxAge:1000 * 60 * 60,
        httpOnly: false
      })
      ctx.body = {
        code: 0,
        data: {
          user, type, _id
        }
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