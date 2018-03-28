import React from 'react';
import logoImg from './assert/logo.jpg';
import './assert/logo.css';

const Logo = () => {
    return (<div className="logo_container">
        <img src={logoImg} alt=""/>
    </div>)
}

export default Logo;