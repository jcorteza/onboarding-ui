import React, { Component } from "react";
import HomeTimelineUIContainer from "./HomeTimelineUIContainer";
import UserTimelineUIContainer from "./UserTimelineUIContainer";

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