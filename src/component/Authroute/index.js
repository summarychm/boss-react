import React from 'react';
import axios from 'axios';

class AuthRoute extends React.Component {
    componentDidMount() {
        //获取用户信息
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                console.log(res.data);
            }
        })
        //是否登录
        //现在的url地址,非login进行跳转
        //用户的type是boss还是牛人
        //用户是否已经完善了个人信息

    }

    render() {
        return null;
    }
}

export default AuthRoute;
