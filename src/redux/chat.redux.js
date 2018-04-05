import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://127.0.0.1:9093');

// 获取消息列表
const MSG_LIST = 'MSG_LIST';
//读取消息
const MSG_RECV = 'MSG_RECV';
//设置为已读
const MSG_READ = 'MSG_READ';

//初始state
const initiState = {
    chatmsg: [],
    users:{},
    unread: 0,
}

// reducer
export function chat(state = initiState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: action.payload.msgs,
                users: action.payload.users,
                unread: action.payload.msgs.filter(i => !i.read).length
            };
        case MSG_RECV:
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1};
        case MSG_READ:
            return state;
        default:
            return state;
    }
}

//获取msg列表的Action Creator
function msgListActionCreator(msgs, users) {
    return {type: MSG_LIST, payload: {msgs, users}};
}

//获取msg列表的外暴事件
export function getMsgList() {
    return dispatch => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgListActionCreator(res.data.msgs, res.data.users));
                }
            })
    }
}

// 发送msg事件的外暴方法会
export function sendMsg(from, to, msg) {
    return dispatch => {
        socket.emit("sendmsg", {from, to, msg});
    }
}

//接收消息的action creator
function recvMsgActionCreator(data) {
    return {type: MSG_RECV, payload: data};
}

// 接收msg信息
export function recvMsg() {
    return function (dispatch) {
        socket.on('recvmsg', function () {
            //重新出发getMsgList事件
            getMsgList()(dispatch);
        })
    }
}


