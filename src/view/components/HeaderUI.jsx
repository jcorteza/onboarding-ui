import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HeaderUI extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <header id="header">
                <h1 id="headerHeaderText">Lab for Josephine</h1>
                <nav>
                    <NavLink to="/home-timeline">Home Timeline</NavLink>
                    <NavLink to="/user-timeline">User Timeline</NavLink>
                    <NavLink to="/post-tweet">Post Tweet</NavLink>
                </nav>
            </header>
        );
    }
}

export default HeaderUI;