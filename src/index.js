import React from "react";
import ReactDOM from "react-dom";
import "./view/style/css/main.css";
import MainContainer from "./view/components/MainContainer";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("root");
    ReactDOM.render(<MainContainer />, document.getElementById("root"));
});