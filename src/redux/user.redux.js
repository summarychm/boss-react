import axios from 'axios';
import {getRedirectPath} from '../util';


//action type
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = "LOAD_DATA";

//初始化数据
const initState = {
    redirectTo: "",//调转的页面
    msg: "",
    name: '',
    pwd: '',
    type: '',
}

//报错 action 登录/注册出错共用该action
function errorMsg(msg) {
    return {type: ERROR_MSG, msg: msg}
}

// 用户验证通过action creator
function authSuccess(obj) {
    const {pwd,...data}=obj;
    return {type: AUTH_SUCCESS, payload: data};
}

//外暴 user reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
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
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

//外暴  获取用户详细信息
export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo};
}

//外暴 注册账户方法
export function register({name, pwd, repeatPwd, type}) {
    if (!name || !pwd || !type)
        return errorMsg('用户名密码必须输入');
    if (pwd !== repeatPwd)
        return errorMsg('两次密码输入不一致!');
    return dispatch => {
        axios.post('/user/register', {name, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({name, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}

//外暴 更新用户信息
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0)
                    dispatch(authSuccess(res.data.data));
                else
                    dispatch(errorMsg(res.data.msg));
            })
    }
}
