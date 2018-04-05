import React from 'react';
import {List, InputItem, NavBar, Icon} from 'antd-mobile';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux';
import {getChatId} from "../../util";

const socket = io("ws://127.0.0.1:9093");
@connect(state => state, {getMsgList, sendMsg, recvMsg})
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: "", msg: []};
    }

    componentDidMount() {
        //如果没有msg则进行获取胡监听socket
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();//获取消息列表
            this.props.recvMsg();//接收最新的信息
        }
    }

    render() {
        const userId = this.props.match.params.user;
        const users = this.props.chat.users;//通信人信息
        if (!users[userId]) {
            return null;
        }
        const {name, avatar} = users[userId];
        const chatid = getChatId(userId, this.props.user._id);
        const msgs = this.props.chat.chatmsg.filter(value => value.chatid == chatid); //消息列表
        return (<div id="chat-page" className="chat-page">
            <NavBar mode={'dark'}
                    icon={<Icon type={"left"}/>}
                    onLeftClick={() => {
                        this.props.history.goBack();
                    }}
            >
                {`与${name}聊天中`}
                {users[userId].avatar &&
                <img src={require(`../AvatarSelector/img/${avatar}.png`)}
                     style={{width: 30, height: 30}}
                     alt=""/>}
            </NavBar>
            <List>

                {msgs && msgs.map(items => {
                    let avatar = require(`../AvatarSelector/img/${users[items.from].avatar}.png`);
                    return items.from === userId //判断是否是我发送的消息
                        ? (items.to && <List.Item
                            key={items._id}
                            thumb={avatar}>{items.content}</List.Item>)
                        // 他人发送的消息,靠左显示
                        : (<List.Item
                            key={items._id}
                            extra={<img src={avatar}
                                        style={{width: 30, height: 30}}
                                        alt=""/>}
                            className='chat-me-theme'>{items.content}</List.Item>)

                })}
            </List>
            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder='请输入要发送的信息'
                        value={this.state.text}
                        onChange={val => this.setState({text: val})}
                        extra={<span onClick={this.handleSubmit}>发送</span>}
                    >信息</InputItem>
                </List>
            </div>
        </div>)
    }

    //发送信息
    handleSubmit = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg(from, to, msg);
        this.setState({text: ""});
    }
}
