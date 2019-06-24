import React, { Component } from "react";
import TweetContainer from "./TweetContainer";

class TimelineContainer extends Component {
    constructor(props) {
        super(props);

        this.errorMessage = "This content is not currently available. Please try again later.";
        this.loadingMessage = "Loading your timeline...";
    }

    render() {
        let timelineContainer = <div></div>;

        if(!this.props.fetchComplete) {
            timelineContainer = (
                <div className="timelineContainer">
                    <p>{this.loadingMessage}</p>
                </div>
            );
        } else if (this.props.fetchComplete && this.props.errorOccurred) {
            timelineContainer = (
                <div className="timelineContainer">
                    <p>{this.errorMessage}</p>
                </div>
            );
        } else if (this.props.fetchComplete && !this.props.errorOccurred) {
            timelineContainer = (this.props.data.length === 0)?
                <p>No tweets are available. Follow someone on Twitter.</p> :
                <div className="timelineContainer">
                    {this.props.data.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div>;
        }

        return timelineContainer;
    }
}

export default TimelineContainer;