import React from "react";
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

import Logo from '../../component/Logo';


class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Logo/>
                <h2>登录页面</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem>密码</InputItem>
                    </List>
                    <Button type="primary" onClick={this.login}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        );
    }
    register = () => {
        console.log(this.props);
        this.props.history.push('/register');
    }
}

export default Login;
