import React from 'react';
import logoImg from './assert/logo.jpg';
import './assert/logo.css';

const Logo = ({title}) => {
    return (<div className="logo_container">
        <img src={logoImg} alt=""/>
        <h2>{title}</h2>
    </div>)
}

export default Logo;