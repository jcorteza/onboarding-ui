import React from "react";
import ReactDOM from "react-dom";
import "./style/css/main.css";
import MainContainer from "./components/MainContainer";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("root");
    ReactDOM.render(<MainContainer />, document.getElementById("root"));
});