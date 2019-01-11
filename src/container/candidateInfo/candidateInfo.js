import React from 'react'
import { NavBar, Icon, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect (
  state => state.user,
  {update}
)
class CadidateInfo extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
			title: '',
			desc: ''
    }
  }
  onChange (key, val) {
    this.setState ({
      [key]: val
    })
  }
  render () {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar
          mode="dark"
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >应聘者信息页</NavBar>
        <AvatarSelector
          selectAvatar={imgname=>{
            this.setState({
              avatar:imgname
            })
          }}
        ></AvatarSelector>
        <InputItem onChange={v => this.onChange('title', v)}>
          求职岗位
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title='个人简介'
        >
        </TextareaItem>
        <Button 
          onClick={()=>{
            this.props.update(this.state)
          }}
          type='primary'>保存</Button>
      </div>
    )
  }
}

export default CadidateInfo