import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HeaderUI extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <header id="header">
                <h1 id="headerH1Text">Lab for Josephine</h1>
                <nav id="navbar">
                        <NavLink exact to="/" activeStyle={{backgroundColor: "#e8f5fd", textDecoration: "underline"}}>Home Timeline</NavLink>
                        <NavLink to="/user-timeline" activeStyle={{backgroundColor: "#e8f5fd", textDecoration: "underline"}}>User Timeline</NavLink>
                        <NavLink to="/post-tweet" activeStyle={{backgroundColor: "#e8f5fd", textDecoration: "underline"}}>Post Tweet</NavLink>
                </nav>
            </header>
        );
    }
}

export default HeaderUI;