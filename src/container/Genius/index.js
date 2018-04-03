import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';
import UserCard from '../../component/UserCard';

@connect(state => state, {getUserList})
export default class Genius extends React.PureComponent {
    componentDidMount() {
        this.props.getUserList('genius');
    }

    render() {
        return (<UserCard userList={this.props.chatUser.userList} history={this.props.history}/>)
    }
}
