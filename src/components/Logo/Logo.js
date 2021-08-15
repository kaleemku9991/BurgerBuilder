import React from 'react';
import burgerLogo from "../../assets/images/burger-logo.png";
import LogoCss from "./Logo.css";

const logo = (props) => (
    <div className="Logo" style={{height:props.height}}>
      <img src={burgerLogo} alt="myBurger"/>
    </div>
    );

export default logo;