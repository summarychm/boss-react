import React from "react";
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile';

import Logo from '../../component/Logo';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'genius'
        }
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo/>
                <h2>注册页面</h2>
                <InputItem>用户名</InputItem>
                <InputItem>密码</InputItem>
                <InputItem>确认密码</InputItem>
                <WhiteSpace/>
                <RadioItem checked={this.state.type === "genius"}>
                    牛人
                </RadioItem>
                <RadioItem checked={this.state.type === "boss"}>
                    BOSS
                </RadioItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type="primary" onClick={this.register}>注册</Button>
            </div>
        );
    }

    register = () => {
        console.log(this.props);
        this.props.history.push('/register');
    }
}

export default Register;
