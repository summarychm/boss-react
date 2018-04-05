import React from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

@withRouter
@connect(state=>state.chat)
export default class NavLinkBar extends React.PureComponent {
    static propTypes = {
        data: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const navList = this.props.data.filter(v => !v.hide);
        const pathname = this.props.location.pathname;
        return (<TabBar>
            {navList.map(item => (
                <TabBar.Item
                    key={item.path}
                    title={item.text}
                    icon={{uri: require(`./img/${item.icon}.png`)}}
                    selectedIcon={{uri: require(`./img/${item.icon}-active.png`)}}
                    selected={pathname === item.path}
                    onPress={() => this.props.history.push(item.path)}
                    badge={item.path==="/msg"&&this.props.unread}
                >
                </TabBar.Item>
            ))}
        </TabBar>);
    }
}
