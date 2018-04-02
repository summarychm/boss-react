import React from 'react';
import PropTypes from 'prop-types';
import {Grid, List} from 'antd-mobile';

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            icon: "",
            text: ""
        }
    }

    render() {
        const avatarList = this.props.avatarList || 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'.split(",").map(value => ({
            icon: require(`./img/${value}.png`),
            text: value
        }));
        const {icon, text} = this.state;
        return (<div>
            <div className={"avatarHeader"}>
                <span>已选择头像:</span>
                {this.state.icon &&
                <img src={icon} title={text} alt={text}/>}
            </div>
            <List>
                <Grid data={avatarList} columnNum={5}
                      isCarousel={true}
                      onClick={ele => {
                          this.setState(ele);
                          this.props.selectAvatar(ele.text)
                      }}/>
            </List>

        </div>)
    }
}

export default AvatarSelector;