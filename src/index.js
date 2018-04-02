import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import reducers from "./reducer";
import "./config";

import "./index.css";
import AuthRoute from './component/Authroute';
import BossInfo from './container/bossinfo';
import GeniusInfo from './container/geniusinfo';
import Login from "./container/login";
import Register from "./container/register";



const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : () => {
};
const store = createStore(reducers,
    compose(applyMiddleware(thunk), reduxDevTools)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {/*判断用户信息,进行路由跳转*/}
                <AuthRoute></AuthRoute>
                <Route path="/bossinfo" component={BossInfo}></Route>
                <Route path="/geniusinfo" component={GeniusInfo}></Route>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
