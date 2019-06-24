import React, { Component } from "react";
import HomeTimelineAPIContainer from "../components/HomeTimelineAPIContainer";
import UserTimelineAPIContainer from "../components/UserTimelineAPIContainer";

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="mainContainer">
                <HomeTimelineAPIContainer />
                <UserTimelineAPIContainer />
            </div>
        );
    }
}

export default MainContainer;