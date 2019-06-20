import React, { Component } from "react";
import TimelineContainer from "../components/TimelineContainer";

class MainContainer extends Component {
    render() {
        return(
            <div>
                <TimelineContainer type="home" />
                <TimelineContainer type="user" />
            </div>
        );
    }
}