import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect (
  state => state
)
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  // shouldComponentUpdate (nextProps, nextState) {
  //   if (this.props.user.user == nextProps.user.user) {
  //     return true
  //   }
  //   return false
  // }
  render () {
    const navList = this.props.data.filter(v=>!v.hide)
    console.log(this.props.user)
    const { pathname } = this.props.location
    return (
      <div>
        <TabBar>
          {navList.map(v=>(
            <TabBar.Item
              badge={v.path==='/msg'?this.props.unread:0}
              key={v.path}
              title={v.text}
              icon={{uri:require(`./img/${v.icon}.png`)}}
              selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
              selected={v.path===pathname}
              onPress={()=>{
                this.props.history.push(v.path)
              }}
            >

            </TabBar.Item>
          ))}
        </TabBar>
      </div>
    )
  }
}

export default NavLinkBar