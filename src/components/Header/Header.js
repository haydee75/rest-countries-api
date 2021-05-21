import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = (props) => {

  return (
    <header>
        <Link to="/countries"><h1>Where in the world?</h1></Link>
        <div className={`btn-switcher ${props.toggleClass}`} onClick={props.toggleAction}><span>{props.toggleName}</span></div>
    </header>
  );
};
export default Header;