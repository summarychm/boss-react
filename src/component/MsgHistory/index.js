import React from 'react';
import {connect} from 'react-redux';
import {Badge, List} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

@connect(state => state)
export default class MsgHistory extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.msgGroup = {};
    }


    render() {
        if (!this.props.chat.chatmsg.length || !this.props.chat.users)
            return null;
        this.msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            this.msgGroup[v.chatid] = this.msgGroup[v.chatid] || [];
            this.msgGroup[v.chatid].push(v);
        })

        //将聊天信息按照分组存入chatList.
        let chatList = Object.values(this.msgGroup);
        chatList = chatList.sort((a, b) => {
            const a_last = a.slice(-1)[0].create_time;
            const b_last = b.slice(-1)[0].create_time;
            return b_last - a_last;
        });
        const userId = this.props.user._id; //当前用户id;
        const usersInfo = this.props.chat.users; //当前用户信息集合
        return (<div>
            <List>
                {chatList.map(item => {
                    let lastMsg = item.slice(-1)[0];
                    //聊天对象id
                    const targetId = lastMsg.from === userId ? lastMsg.to : lastMsg.from;
                    const unreadNum = item.filter(v => (!v.read && v.to === userId && v.from === targetId));
                    if (!usersInfo[targetId])
                        return null;
                    return (<Item key={lastMsg._id}
                                  extra={<Badge text={unreadNum.length}></Badge>}
                                  thumb={require(`../img/${usersInfo[targetId].avatar}.png`)}
                                  arrow={"horizontal"}
                                  onClick={() => {
                                      this.props.history.push(`/chat/${targetId}`)
                                  }}
                    >
                        {lastMsg.content}
                        <Brief>{usersInfo[targetId].name}</Brief>
                    </Item>)
                })}
            </List>
        </div>)
    }
}

