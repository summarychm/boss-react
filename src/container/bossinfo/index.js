import React from 'react';
import {NavBar, InputItem, TextareaItem, Button, List, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';

import ImoocForm from '../ImoocFrom';
import {update} from '../../redux/user.redux';
import AvatarSelector from '../../component/AvatarSelector';

@connect(state => state.user, {update})
@ImoocForm
class BossInfo extends React.PureComponent {
    render() {
        const redirectTo = this.props.redirectTo;
        const path = this.props.location.pathname;
        return (<div>
            {(redirectTo && redirectTo !== path) && <Redirect to={this.props.redirectTo}></Redirect>}
            <NavBar>BOSS完善信息页面</NavBar>
            <AvatarSelector selectAvatar={text => this.props.handleChange('avatar', text)}></AvatarSelector>
            <WhiteSpace/>
            <WhiteSpace/>
            <List>
                <InputItem onChange={v => this.props.handleChange('title', v)}>招聘职位</InputItem>
                <InputItem onChange={v => this.props.handleChange('company', v)}>公司名称</InputItem>
                <InputItem onChange={v => this.props.handleChange('money', v)}>职位薪资</InputItem>
                <TextareaItem
                    rows={3}
                    count={300}
                    title={"职位要求"}
                    placeholder={"当前职位要求"}
                    onChange={v => this.props.handleChange('desc', v)}
                />
                <Button onClick={this.handleClick} type={"primary"}>保存</Button>
            </List>
        </div>)
    }

    //更新详细信息
    handleClick = () => {
        this.props.update(this.props.state);
    }
}

export default BossInfo;