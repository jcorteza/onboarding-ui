import React, { Component } from "react";
import HomeTimelineContainer from "../components/HomeTimelineContainer";
import HomeTimelineContainer from "../components/HomeTimelineContainer";
import UserTimelineContainer from "../components/UserTimelineContainer";

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="mainContainer">
                <HomeTimelineContainer />
                <UserTimelineContainer />
            </div>
        );
    }
}

export default MainContainer;