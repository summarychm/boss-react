import React from "react";
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

import Logo from '../../component/Logo';


class Login extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Logo title={"登录页面"}/>
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
        this.props.history.push('/register');
    }
}

export default Login;
