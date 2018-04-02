import React from 'react';
import {NavBar, InputItem, TextareaItem, Button, List} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';

import {update} from '../../redux/user.redux';
import AvatarSelector from '../../component/AvatarSelector';
import ImoocForm from '../ImoocFrom';

@connect(state => state.user, {update})
@ImoocForm
class GeniusInfo extends React.PureComponent {

    render() {
        const redirectTo = this.props.redirectTo;
        const path = this.props.location.pathname;
        return (<div>
            {(redirectTo && redirectTo !== path) && <Redirect to={this.props.redirectTo}></Redirect>}
            <NavBar>牛人完善信息页面</NavBar>
            <AvatarSelector selectAvatar={text => this.props.handleChange('avatar', text)}></AvatarSelector>
            <List>
                <InputItem onChange={v => this.props.handleChange('title', v)}>求职岗位</InputItem>
                <TextareaItem
                    rows={3}
                    count={300}
                    title={"个人简介"}
                    placeholder={"个人简介"}
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

export default GeniusInfo;