import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {NavBar} from 'antd-mobile';

import {getMsgList, recvMsg} from '../../redux/chat.redux';
import NavLinkBar from '../../component/NavLinkBar';
import Boss from '../../container/Boss';
import Genius from '../../container/Genius';
import User from '../../component/User';
import MsgHistory from '../../component/MsgHistory';


@connect(state => state, {getMsgList, recvMsg})
export default class Dashboard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //如果没有msg则进行获取胡监听socket
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();//获取消息列表
            this.props.recvMsg();//接收最新的信息
        }
    }

    render() {
        const {location, user} = this.props;
        const navList = [{
            path: '/boss',
            text: 'Boss',
            icon: 'boss',
            title: "BOSS列表",
            component: Boss,
            hide: user.type === 'boss'
        }, {
            path: '/genius',
            text: 'Genius',
            icon: 'genius',
            title: "牛人列表",
            component: Genius,
            hide: user.type === 'genius'
        }, {
            path: '/msg',
            text: '消息',
            icon: 'msg',
            title: "消息列表",
            component: MsgHistory,
        }, {
            path: '/me',
            text: '我',
            icon: 'user',
            title: "个人中心",
            component: User,
        }];
        let title = navList.find(value => value.path === location.pathname) && navList.find(value => value.path === location.pathname).title;
        return (<div>
            <NavBar className={'fixed-header'}>{title}</NavBar>
            <div>
                <Switch>
                    {navList.map(item => (
                        <Route key={item.path} path={item.path} component={item.component}></Route>
                    ))}
                </Switch>
            </div>
            <NavLinkBar data={navList}></NavLinkBar>
        </div>)
    }
}


