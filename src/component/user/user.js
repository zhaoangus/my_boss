import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'

const Item = List.Item
const Brief = Item.Brief

@connect (
  state => state.user,
  { logoutSubmit }
)
class User extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout () {
    const alert = Modal.alert
    alert('注销', '确认退出登录吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        browserCookie.erase('userid')
        this.props.logoutSubmit()
      }}
    ])
  }
  render () {
    const props = this.props
    return props.user? (
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt="" />}
          title={props.user}
          message={props.type==='boss'?props.company:null}
        />
        <List
          renderHeader={()=>'简介'}
        >
          <Item multipleLine>
            {props.title}
            {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
            {props.salary?<Brief>薪资: {props.salary}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ):
    <Redirect to={props.redirectTo}></Redirect>
  }
}

export default User
