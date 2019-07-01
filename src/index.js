import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import "./view/style/css/main.css";
import HeaderUI from "./view/components/HeaderUI";
import HomeTimelineUIContainer from "./view/components/HomeTimelineUIContainer";
import UserTimelineUIContainer from "./view/components/UserTimelineUIContainer";
// import MainContainer from "./view/components/MainContainer";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("root");
    ReactDOM.render(
    <Router>
        {HeaderUI}
        <Route path="/home-timeline" component={HomeTimelineUIContainer} />
        <Route path="/user-timeline" component={UserTimelineUIContainer} />
    </Router>, 
    document.getElementById("root"));
});