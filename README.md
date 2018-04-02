# 一款招聘APP

## 项目简介
> APP界面与逻辑类似于boss直聘,分为boss和大牛2种角色.
> 双方都可以登录该APP,根据身份的不同会展示不同的界面.
> boss可以发布新职位,大牛和boss之间可以通过app直接进行聊天沟通.

## 项目截图(稍后)

## 演示地址(稍后)

## 使用的技术栈
* 前端:React+Redux+React-Router
* 后端:express+Socket.io+mongoDB
* 数据交互使用json,身份验证基于cookie验证(cookie-parser)
* [antd-mobile](https://github.com/ant-design/ant-design-mobile/) 引入and design UI库
* [react-app-rewired](https://github.com/timarney/react-app-rewired) 和 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 为了实现Mobile Ant Design按需加载
* [redux-thunk](https://github.com/gaearon/redux-thunk) 和 [react-redux](https://github.com/reactjs/react-redux)和 [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)[装饰器插件]
* [react-router-dom](https://github.com/ReactTraining/react-router/)
* [axios](https://github.com/axios/axios)
* [nodemon](https://github.com/remy/nodemon)
* [utility](https://github.com/node-modules/utility) 字符串加解密模块
* [prop-types](https://github.com/facebook/prop-types) 组件传递参数验证
* []()


## 运行步骤
* git clone https://github.com/summarychm/boss-react.git
* yarn install
* 新开终端进程,运行 yarn mongoose
* 新开终端进程,运行 yarn node
* 新开终端进程,运行 yarn start
