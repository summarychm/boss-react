import React from "react";
import {
  NavBar,
  InputItem,
  TextareaItem,
  Toast,
  Button,
  List
} from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { update } from "../../redux/user.redux";
import AvatarSelector from "../../component/AvatarSelector";
import ImoocForm from "../ImoocFrom";

@connect(state => state.user, { update })
@ImoocForm
class GeniusInfo extends React.PureComponent {
  componentDidMount() {
    setTimeout(function() {
      window.dispatchEvent(new Event("resize"));
    }, 0);
    //批量初始化
    this.props.handleChange("avatar", "");
    this.props.handleChange("title", "");
    this.props.handleChange("desc", "");
  }
  render() {
    const redirectTo = this.props.redirectTo;
    const path = this.props.location.pathname;
    return (
      <div>
        {redirectTo &&
          redirectTo !== path && <Redirect to={this.props.redirectTo} />}
        <NavBar>牛人完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={text => this.props.handleChange("avatar", text)}
        />
        <List>
          <InputItem onChange={v => this.props.handleChange("title", v)}>
            求职岗位
          </InputItem>
          <TextareaItem
            rows={3}
            title={"个人简介"}
            placeholder={"个人简介"}
            onChange={v => this.props.handleChange("desc", v)}
          />
          <Button onClick={this.handleClick} type={"primary"}>
            保存
          </Button>
        </List>
      </div>
    );
  }

  //更新详细信息
  handleClick = () => {
    for (let cur of Object.keys(this.props.state)) {
      if (!this.props.state[cur]) {
        Toast.info(cur + "未输入!");
        return null;
      }
    }
    this.props.update(this.props.state);
  };
}

export default GeniusInfo;
