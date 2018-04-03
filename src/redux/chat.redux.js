import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://127.0.0.1:9093');

// action type
const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

//初始state
const initiState = {
    chatmsg: [],
    unread: 0,
}

// reducer
export function chatReducer(state = initiState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: action.payload,
                unread: action.payload.filter(i => !i.read).length
            };
        case MSG_RECV:
            return state;
        case MSG_READ:
            return state;
        default:
            return state;
    }
}

function msgList(msgs) {
    return {type: MSG_LIST, payload: msgs};
}

export function getMsgList() {
    return dispatch => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.state === 200 && +res.data.code === 0) {
                    dispatch(msgList(res.data.data));
                }
            })
    }
}


