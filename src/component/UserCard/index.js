import React from 'react';
import PropTypes from 'prop-types';
import {WingBlank, WhiteSpace, Card} from 'antd-mobile';

const UserCard = ({userList, history}) => {
    return (<WingBlank>
        <WhiteSpace/>
        {userList.map(item => {
            return (item.avatar && <Card
                key={item._id}
                onClick={() => history.push({
                    pathname: `/chat/${item._id}`,
                    query: {
                        userid: item._id,
                        name: item.name,
                        avatar:item.avatar,
                    }
                })}>
                <Card.Header
                    title={item.title}
                    thumb={require(`../AvatarSelector/img/${item.avatar}.png`)}
                    extra={<span>{item.title}</span>}
                >
                </Card.Header>
                <Card.Body>
                    {item.type === "boss" && <div>公司:{item.company}</div>}
                    <WhiteSpace/>
                    {item.desc}
                    <WhiteSpace/>
                    {item.type === "boss" && <div>薪资:{item.money}</div>}

                </Card.Body>
            </Card>)
        })}
    </WingBlank>)
}

UserCard.propTypes = {
    userList: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default UserCard;
