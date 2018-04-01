import React from "react";
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';

import Logo from '../../component/Logo';

@connect(state => state.user, {register})
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pwd: '',
            repeatPwd: '',
            type: "genius",
        }
    }

    render() {
        const RadioItem = Radio.RadioItem;

        return (
            <div>
                <Logo title={"注册页面"}/>
                {this.props.msg && <p className="error-msg">{this.props.msg}</p>}
                {this.props.redirectTo && <Redirect to={this.props.redirectTo}/>}
                <InputItem onChange={v => this.handleChange('name', v)}>用户名</InputItem>
                <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                <InputItem type="password" onChange={v => this.handleChange('repeatPwd', v)}>确认密码</InputItem>
                <WhiteSpace/>
                <List>
                    <RadioItem key={"genius"} checked={this.state.type === "genius"}
                               onChange={() => this.handleChange('type', 'genius')}>牛人
                    </RadioItem>
                    <RadioItem key={"boos"} checked={this.state.type === "boss"}
                               onChange={() => this.handleChange('type', 'boss')}>BOSS
                    </RadioItem>
                </List>
                <WhiteSpace size="lg"/>
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </div>
        );
    }

    //保存用户更改
    handleChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }
    //注册按钮事件
    handleRegister = () => {
        this.props.register(this.state);
        //this.props.history.push('/register');
    }
}

export default Register;
