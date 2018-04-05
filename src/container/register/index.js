import React from "react";
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';

import Logo from '../../component/Logo';
import ImoocForm from '../ImoocFrom';

@connect(state => state.user, {register})
@ImoocForm
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.props.handleChange('type', 'genius');
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo title={"注册页面"}/>
                {this.props.msg && <p className="error-msg">{this.props.msg}</p>}
                {this.props.redirectTo && <Redirect to={this.props.redirectTo}/>}
                <InputItem onChange={v => this.props.handleChange('name', v)}>用户名</InputItem>
                <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                <InputItem type="password" onChange={v => this.props.handleChange('repeatPwd', v)}>确认密码</InputItem>
                <WhiteSpace/>
                <List>
                    <RadioItem key={"Genius"} checked={this.props.type === "genius"}
                               onChange={() => this.props.handleChange('type', 'genius')}>牛人
                    </RadioItem>
                    <RadioItem key={"boos"} checked={this.props.type === "boss"}
                               onChange={() => this.props.handleChange('type', 'boss')}>BOSS
                    </RadioItem>
                </List>
                <WhiteSpace size="lg"/>
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </div>
        );
    }
    //注册按钮事件
    handleRegister = () => {
        this.props.register(this.props.state);
        //this.props.history.push('/register');
    }
}

export default Register;
