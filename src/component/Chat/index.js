import React from 'react';
import io from 'socket.io-client';

export default class Chat extends React.Component {
    componentDidMount(){
        const socket=io("ws://127.0.0.1:9093");
    }
    render() {
        return (<h2>chat with user:{this.props.match.params.user}</h2>)
    }
}
