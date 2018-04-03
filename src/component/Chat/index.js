import React from 'react';
import {List, InputItem} from 'antd-mobile';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {getMsgList} from '../../redux/chat.redux';

const socket = io("ws://127.0.0.1:9093");
@connect(state => state, {getMsgList})
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: "", msg: []};
    }

    componentDidMount() {
        this.props.getMsgList();
        // //监听并接收全局socket通信.
        // socket.on('recvmsg', data => {
        //     this.setState({
        //         msg: [...this.state.msg, data]
        //     })
        // });
    }

    render() {
        return (<div className="stick-footer">
            <List>
                <InputItem
                    placeholder='请输入要发送的信息'
                    value={this.state.text}
                    onChange={val => this.setState({text: val})}
                    extra={<span onClick={this.handleSubmit}>发送</span>}
                >信息</InputItem>
            </List>
        </div>)
    }

    handleSubmit = () => {
        socket.emit("sendmsg", {text: this.state.text});
        this.setState({text: ""});
    }
}
