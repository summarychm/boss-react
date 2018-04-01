import axios from 'axios';
import {getRedirectPath} from '../util';


//action type
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCESS = 'LOGIN_SUCESS';
const LOAD_DATA = "LOAD_DATA";

//初始化数据
const initState = {
    redirectTo: "",//调转的页面
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
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        case LOGIN_SUCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

//外暴 登录方法
export function login({name, pwd}) {
    if (!name || !pwd) {
        return errorMsg("用户名密码必须输入!");
    }
    return dispatch => {
        axios.post('/user/login', {name, pwd}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

function loginSuccess(data) {
    return {type: LOGIN_SUCESS, payload: data};
}

export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo};
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
