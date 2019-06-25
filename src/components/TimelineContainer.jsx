import React, { Component } from "react";
import TweetContainer from "./TweetContainer";

class TimelineContainer extends Component {
    constructor(props) {
        super(props);
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
                <div className="timelineContainer">
                    <p>{this.props.fillerMessage}</p> 
                </div> :
                <div className="timelineContainer">
                    {this.props.data.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div>;
        }

        return timelineContainer;
    }
}

TimelineContainer.prototype.errorMessage = "This content is not currently available. Please try again later.";
TimelineContainer.prototype.loadingMessage = "Loading your timeline...";

export default TimelineContainer;