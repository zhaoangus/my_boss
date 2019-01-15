import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util';

@connect (
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {text: '', msg: []}
  }
  componentDidMount () {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  componentWillUnmount () {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  handleSubmit () {
    // socket.emit('sendmsg', {text: this.state.text})
    // this.setState({text: ''})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: '',
      showEmoji: false
    })
  }
  fixCarousel () {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  render () {
    const emoji = '😃 😁 😂 🤣 😉 😎 😍 😘 🥰 🤩 😫 😴 😃 😁 😂 🤣 😉 😎 😍 😘 🥰 🤩 😫 😴 😃 😁 😂 🤣 😉 😎 😍 😘 🥰 🤩 😫 😴 😃 😁 😂 🤣 😉 😎 😍 😘 🥰 🤩 😫 😴 😃 😁 😂 🤣 😉 😎 😍 😘 🥰 🤩 😫 😴 😃 😁 😂 🤣 😉 😎 😍 😘 🥰 🤩 😫 😴'
                    .split(' ')
                    .filter(v=>v)
                    .map(v=>({text:v}))
    const userid = this.props.match.params.user
    const users = this.props.chat.users
    const Item = List.Item
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
    return (
      <div id='chat-page'>
        <NavBar
          mode='dark'
          icon={<Icon type="left" />}
          onLeftClick={()=>{
            this.props.history.goBack()
          }}
          >
          {users[userid].name}
        </NavBar>

        {chatmsg.map(v=>{
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from===userid?(
            <List key={v._id}>
              <Item
                thumb={avatar}
              >{v.content}</Item>
            </List>
          ):(
            <List key={v._id}>
              <Item 
                extra={<img alt='头像' src={avatar} />}
                className='chat-me'>{v.content}</Item>
            </List>
          )
        })}
        <div className="sticky-footer">
        {this.state.showEmoji?
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el=>{
                this.setState({text:this.state.text+el.text})
              }}
            />:null}
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={
                <div>
                  <span
                    style={{marginRight: 10}}
                    onClick={()=>{
                      this.setState({showEmoji:!this.state.showEmoji})
                      this.fixCarousel()
                    }}
                  >😃</span>
                  <span onClick={()=>this.handleSubmit()}>发送</span>
                </div>
              }
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat