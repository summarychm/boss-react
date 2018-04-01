import axios from 'axios';

//action type
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

//初始化数据
const initState = {
    isAuth: false,
    msg: "",
    name: '',
    pwd: '',
    type: '',
}

// user reducer
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', isAuth: true, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        default:
            return state;
    }
}


//报错 action 登录/注册出错共用该action
function errorMsg(msg) {
    return {type: ERROR_MSG, msg: msg}
}

//注册成功的action
function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload: data}
}

//register的外露方法
export function register({name, pwd, repeatPwd, type}) {
    if (!name || !pwd || !type)
        return errorMsg('用户名密码必须输入');
    if (pwd !== repeatPwd)
        return errorMsg('两次密码输入不一致!');
    return dispatch => {
        axios.post('/user/register', {name, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess({name, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}
