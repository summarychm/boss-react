import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {NavBar} from 'antd-mobile';

import NavLinkBar from '../../component/NavLinkBar';
import Boss from '../../container/Boss';
import Genius from '../../container/Genius';

const Msg = () => <p>消息列表</p>;
const User = () => <p>个人中心</p>;


@connect(state => state, {})
export default class Dashboard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
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
            component: Msg,
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


