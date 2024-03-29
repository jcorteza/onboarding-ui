import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import HomeTimelineUIContainer from "./HomeTimelineUIContainer";
import UserTimelineUIContainer from "./UserTimelineUIContainer";
import PostTweetUI from "./PostTweetUI";

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="mainContainer">
                <Route exact path="/" component={HomeTimelineUIContainer} />
                <Route path="/user-timeline" component={UserTimelineUIContainer} />
                <Route path="/post-tweet" component={PostTweetUI} />
            </div>
        );
    }
}

export default MainContainer;