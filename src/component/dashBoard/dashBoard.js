import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navLink/navLink'
import Boss from '../../component/boss/boss'
import Candidate from '../../component/candidate/candidate'
import User from '../../component/user/user'
import Msg from '../msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect (
  state => state,
  { getMsgList, recvMsg }
)
class DashBoard extends React.Component {
  componentDidMount () {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render () {
    const {pathname} = this.props.location
    const user = this.props.user 
    console.log(user.type)
    const navList = [
      {
        path: '/boss',
        text: '应聘者',
        icon: 'boss',
        title: '应聘者列表',
        component: Boss,
        hide: user.type === 'candidate'
      },
      {
        path: '/candidate',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Candidate,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg,
      },
      {
        path: '/me',
        text: '我的',
        icon: 'user',
        title: '个人中心',
        component: User,
      }
    ]
    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path===pathname).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default DashBoard