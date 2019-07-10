import React, { Component } from "react";
import TweetContainer from "./TweetContainer";

class TimelineContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let content = <p></p>;

        if(!this.props.fetchComplete) {
            
            content = <p className="infoText">{this.loadingMessage}</p>;

        } else if (this.props.fetchComplete && (this.props.errorOccurred || !this.props.data instanceof Array)) {
            
            content = <p className="infoText">{this.errorMessage}</p>;

        } else if (this.props.fetchComplete && !this.props.errorOccurred) {

            content = (this.props.data.length === 0)?
                <p className="infoText">{this.props.fillerMessage}</p> :
                this.props.data.map(status => 
                    <TweetContainer key={`${status.user.twHandle}-${status.statusID}`} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                );

        }

        return <div className="timelineContainer">{content}</div>;
    }
}

TimelineContainer.prototype.errorMessage = "This content is not currently available. Please try again later.";
TimelineContainer.prototype.loadingMessage = "Loading your timeline...";

export default TimelineContainer;