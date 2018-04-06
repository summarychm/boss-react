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
    users: {},
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
                unread: action.payload.msgs.filter(i => !i.read && i.to === action.payload.userid).length
            };
        case MSG_RECV:
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1};
        case MSG_READ:
            const {targetId, userId} = action.payload;
            return {
                ...state,
                //将所有的未读状态都改为了已读.
                chatmsg: state.chatmsg.map(v => ({
                    ...v,
                    read: (v.from === targetId && v.to === userId) ? true : v.read
                })),
                unread: state.unread - action.payload.num
            };
        default:
            return state;
    }
}

//获取msg列表的Action Creator
function msgListActionCreator(msgs, users, userid) {
    return {type: MSG_LIST, payload: {msgs, users, userid}};
}

//获取msg列表的外暴事件
export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    let userid = getState().user._id;
                    dispatch(msgListActionCreator(res.data.msgs, res.data.users, userid));
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
    return dispatch => {
        socket.on('recvmsg', function (data) {
            dispatch(recvMsgActionCreator(data))
        })
    }
}

//消息已读 action creator
function msgRead({targetId, userId, num}) {
    return {type: MSG_READ, payload: {targetId, userId, num}};
}

// targetId 聊天对象 userid 当前用户
export function readMsg(targetId, userId) {
    return dispatch => {
        axios.post(`/user/readmsg`, {targetId, userId})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgRead({targetId, userId, num: res.data.num}))
                }
            })
    }
}


