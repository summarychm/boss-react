import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';

import {WingBlank, WhiteSpace, Card} from 'antd-mobile';

@connect(state => state, {getUserList})
export default class Genius extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.props.getUserList('genius');
    }

    render() {
        return (<WingBlank>
            <WhiteSpace/>
            {this.props.chatUser.userList.map(item => {
                return (item.avatar && <Card key={item._id}>
                    <Card.Header
                        title={item.title}
                        thumb={require(`../../component/AvatarSelector/img/${item.avatar}.png`)}
                        extra={<span>{item.title}</span>}
                    >
                    </Card.Header>
                    <Card.Body>
                        {item.desc}
                    </Card.Body>
                </Card>)
            })}
        </WingBlank>)
    }
}
