import React from 'react';
import PropTypes from 'prop-types';
import {WingBlank, WhiteSpace, Card} from 'antd-mobile';

const UserCard = ({userList}) => {
    return (<WingBlank>
        <WhiteSpace/>
        {userList.map(item => {
            return (item.avatar && <Card key={item._id}>
                <Card.Header
                    title={item.title}
                    thumb={require(`../AvatarSelector/img/${item.avatar}.png`)}
                    extra={<span>{item.title}</span>}
                >
                </Card.Header>
                <Card.Body>
                    公司:{item.company}
                    <WhiteSpace/>
                    {item.desc}
                    <WhiteSpace/>
                    薪资:{item.money}
                </Card.Body>
            </Card>)
        })}
    </WingBlank>)
}
UserCard.propTypes = {
    userList: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default UserCard;
