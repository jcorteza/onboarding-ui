import React, { Component } from "react";
import TweetContainer from "./TweetContainer";
import StatusUpdateUI from "./StatusUpdateUI";
import postReplyToTweet from "../../service/postReplyToTweet";

class ReplyToTweetModalUI extends Component {
    constructor(props) {
        super(props);

        this.handleModalContentClick = this.handleModalContentClick.bind(this);
    }

    handleModalContentClick(e) {
        e.stopPropagation();
    }

    render() {
        return(
            <div className="uiContainer modal" onClick={this.props.changeModalDisplay}>
                <div id="replyToTweetModalUI" onClick={this.handleModalContentClick}>
                    <div id="closeModuleIcon" onClick={this.props.changeModalDisplay}>X</div>
                    <div id="replyToTweetModalContent">
                        <h2 id="modalHeader">Reply to Tweet</h2>
                        <TweetContainer 
                            user={this.props.tweetData.user}
                            postUrl={this.props.tweetData.postUrl}
                            message={this.props.tweetData.message}
                            createdAt={this.props.tweetData.createdAt} />
                        <StatusUpdateUI postStatusUpdate={postReplyToTweet} statusID={this.props.tweetData.statusID} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ReplyToTweetModalUI;