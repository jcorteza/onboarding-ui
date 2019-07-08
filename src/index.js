import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import "./view/style/css/main.css";
import HeaderUI from "./view/components/HeaderUI";
import MainContainer from "./view/components/MainContainer";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("root");
    ReactDOM.render(
    <Router basename="/">
        <HeaderUI />
        <MainContainer />
    </Router>, 
    document.getElementById("root"));
});