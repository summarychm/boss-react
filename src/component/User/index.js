import React from 'react';
import {connect} from 'react-redux';
import {Button, Result, List, WhiteSpace, Modal, Toast} from 'antd-mobile';
import BrowserCookie from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';

@connect(state => state.user, {logoutSubmit})
export default class User extends React.PureComponent {
    render() {
        const {avatar, name, type, company, title, desc, money, redirectTo} = this.props;
        return name ? (
            <div>
                <Result
                    img={<img
                        src={require(`../img/${avatar}.png`)}
                        style={{width: 50, height: 50}}
                        alt=""
                    />}
                    title={name}
                    message={type === 'boss' && company}
                />
                <List renderHeader={() => type === "genius" ? '个人简历' : '招聘简章'}>
                    <List.Item multipleLine wrap={true}>
                        {title}
                        <p>{desc}</p>
                        {money && <List.Item.Brief>薪资:{money}</List.Item.Brief>}
                    </List.Item>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <List.Item>
                        <Button type={"warning"} onClick={this.handleSignOut}>退出登录</Button>
                    </List.Item>
                </List>
            </div>
        ) : <Redirect to={redirectTo}/>;
    }

    handleSignOut = () => {
        Modal.alert('警告', '是否退出登录?', [
            {text: '取消', onPress: () => console.wring('cancel')},
            {
                text: '确认',
                onPress: () => {
                    BrowserCookie.erase('userid');//清除cookie
                    this.props.logoutSubmit();
                    Toast.info('退出成功!', 1);
                }

            },
        ])
    }
}

