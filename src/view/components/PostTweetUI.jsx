import React, { Component } from "react";
import StatusUpdateUI from "./StatusUpdateUI";
import postTweetToTimeline from "../../service/postTweetToTimeline";

class PostTweetUI extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="postTweetUI" className="uiContainer">
                <StatusUpdateUI postStatusUpdate={postTweetToTimeline} />
            </div>
        );
    }
}

export default PostTweetUI;