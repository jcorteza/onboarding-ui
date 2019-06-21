import React, { Component } from "react";
import TimelineContainer from "../components/TimelineContainer";

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <TimelineContainer timelineType="home" />
                <TimelineContainer timelineType="user" />
            </div>
        );
    }
}

export default MainContainer;