import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux' 
import UserCard from '../userCard/userCard';

@connect (
  state => state.chatuser,
  { getUserList }
)
class Boss extends React.Component {
  componentDidMount () {
    this.props.getUserList('candidate')
  }
  render () {
    return <UserCard userlist={this.props.userlist}></UserCard>
  }
}

export default Boss