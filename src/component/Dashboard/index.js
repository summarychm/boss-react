import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import NavLinkBar from '../../component/NavLinkBar';

const Boss = () => <p>Boss列表</p>;
const Genius = () => <p>牛人列表</p>;
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
            text: 'genius',
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

        return (<div>
            <NavBar className={'fixed-header'}>{navList.find(value => value.path === location.pathname).title}</NavBar>
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


