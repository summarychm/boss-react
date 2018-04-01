import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import reducers from "./reducer";
import "./config";

import Login from "./container/login";
import Register from "./container/register";
import AuthRoute from './component/Authroute';
import "./index.css";

const Boos = () => {
    return (<h3>Boos页面</h3>)
}
const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : () => {};
const store = createStore(reducers,
    compose(applyMiddleware(thunk), reduxDevTools)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {/*判断用户信息,进行路由跳转*/}
                <AuthRoute></AuthRoute>
                <Route path="/boos" component={Boos}></Route>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
