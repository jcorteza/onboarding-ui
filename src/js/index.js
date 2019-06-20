import React from "react";
import ReactDOM from "react-dom";
import "../style/css/main.css";
import TimelineContainer from "../components/TimelineContainer.jsx";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("root");
    ReactDOM.render(<TimelineContainer />, document.getElementById("root"));
});