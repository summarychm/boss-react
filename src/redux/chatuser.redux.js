import axios from 'axios';

//action
const USER_LIST = 'USER_LIST';

//action creator
function userList(data) {
    return {type: USER_LIST, payload: data};
}

//初始state
const initState = {userList: []};

// reducer
export function chatUser(state = initState, action) {
    switch (action.type) {
        case USER_LIST:
            return {...state, userList: action.payload};
        default:
            return state;
    }
}

//外暴 操作函数
export function getUserList(type) {
    return dispatch => {
        axios.get(`/user/list?type=${type}`)
            .then(res => {
                if (res.status === 200 && res.data.code == 0)
                    dispatch(userList(res.data.data));
            })
    }
}
