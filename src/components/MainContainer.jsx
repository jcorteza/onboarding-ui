import React, { Component } from "react";
import HomeTimelineUIContainer from "../components/HomeTimelineUIContainer";
import UserTimelineUIContainer from "../components/UserTimelineUIContainer";

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="mainContainer">
                <HomeTimelineUIContainer />
                <UserTimelineUIContainer />
            </div>
        );
    }
}

export default MainContainer;