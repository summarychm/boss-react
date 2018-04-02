import React from "react";
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {login} from '../../redux/user.redux';
import Logo from '../../component/Logo';
import ImoocForm from '../ImoocFrom';

@connect(state => state.user, {login})
@ImoocForm
class Login extends React.PureComponent {
    render() {
        return (
            <div>
                <Logo title={"登录页面"}/>
                {this.props.msg && <p className="error-msg">{this.props.msg}</p>}
                {(this.props.redirectTo && this.props.redirectTo !== 'login') && <Redirect to={this.props.redirectTo}/>}
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.props.handleChange('name', v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type={'password'}
                            onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        );
    }
    handleLogin = () => {
        this.props.login(this.props.state);
    }
    register = () => {
        this.props.history.push('/register');
    }
}

export default Login;
