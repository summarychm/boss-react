import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {BrowserRouter, Route, Switch} from "react-router-dom"; // Redirect

import reducers from "./reducer";
import "./config";

import "./index.css";
import AuthRoute from './component/Authroute';
import BossInfo from './container/bossinfo';
import GeniusInfo from './container/geniusinfo';
import Login from "./container/login";
import Register from "./container/register";
import Dashboard from './component/Dashboard';


const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : () => {
};
const store = createStore(reducers,
    compose(applyMiddleware(thunk), reduxDevTools)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    {/*判断用户信息,进行路由跳转*/}
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
