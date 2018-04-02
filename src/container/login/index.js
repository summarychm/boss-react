import React from "react";
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {login} from '../../redux/user.redux';
import Logo from '../../component/Logo';

@connect(state => state.user, {login})
class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pwd: ''
        }
    }

    render() {
        return (
            <div>
                <Logo title={"登录页面"}/>
                {this.props.msg && <p className="error-msg">{this.props.msg}</p>}
                {this.props.redirectTo && <Redirect to={this.props.redirectTo}/>}
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handleChange('name', v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type={'password'}
                            onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        );
    }

    //保存用户更改
    handleChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }
    handleLogin = () => {
        this.props.login(this.state);
    }
    register = () => {
        this.props.history.push('/register');
    }
}

export default Login;
