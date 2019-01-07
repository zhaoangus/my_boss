import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  redirectTo: '',
  isAuth: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}
// reducer
export function user (state=initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.pyload}
    case LOGIN_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.pyload}
    case ERROR_MSG:
      return {...state, msg: action.msg, isAuth: false, }
    default:
      return state
  }
}
// action创建函数
function errorMsg (msg) {
  return { msg, type: ERROR_MSG }
}

function registerSuccess (data) {
  return { payload: data, type: REGISTER_SUCCESS }
}

function loginSuccess (data) {
  return { type: LOGIN_SUCCESS, payload: data }
}

export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入') 
  }
  return dispatch => {
    axios.post('/user/login', {
      user,
      pwd
    }).then((res) => {
      if (res.status === 200 && parseInt(res.data.code) === 0) {
        // dispatch(registerSuccess({user, pwd}))
        dispatch(loginSuccess(res.data.res))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function register ({user, pwd, repeatPwd, type}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatPwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', {
      user,
      pwd,
      type
    }).then((res) => {
      if (res.status === 200 && parseInt(res.data.code) === 0) {
        dispatch(registerSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}