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
class BossInfo extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
			title: '',
			desc: '',
			company: '',
			salary: ''
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
        >Boss信息页</NavBar>
        <AvatarSelector
          selectAvatar={imgname=>{
            this.setState({
              avatar:imgname
            })
          }}
        ></AvatarSelector>
        <InputItem onChange={v => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange('salary', v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title='职位要求'
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

export default BossInfo