import React, { Component } from "react";
import TweetContainer from "./TweetContainer";
import postReplyToTweet from "../../service/postReplyToTweet";

class ReplyToTweetModalUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            replyText: "",
            replyInProgress: false,
            replyComplete: false,
            replySuccessful: false,
        }

        this.handleModalContentClick = this.handleModalContentClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmitReply = this.handleSubmitReply.bind(this);
    }

    handleModalContentClick(e) {
        e.stopPropagation();
    }

    handleTextChange(e) {
        this.setState({ replyText: e.target.value });
    }

    handleSubmitReply(e) {
        e.preventDefault();
        this.setState({ replyInProgress: true }, () => {
            
            postReplyToTweet(this.state.replyText, this.props.statusID)
                .then((response) => {

                    if(response.successful) {

                        this.setState({ replyText: "" });
                    }

                    this.setState({ replySuccessful: response.successful });

                })
                .catch((err) => {

                    console.log(err);
                    this.setState({ replySuccessful: false });

                })
                .finally(() => {
 
                    this.setState({ 
                        replyInProgress: false,
                        replyComplete: true
                    }, () => {

                        setTimeout(() => {
                            this.setState({ replyComplete: false });
                        }, 3000);

                    });

                });

        });
    }

    render() {
        console.log(this.props.tweetData.createdAt);
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
                        <textarea 
                            className="statusUpdateTextarea"
                            placeholder="Your reply..."
                            maxLength="280"
                            value={this.state.replyText} 
                            onChange={this.handleTextChange}
                            disabled={this.state.replyInProgress}></textarea>
                        <span 
                            className="charCountSpan">
                            Characters: {280 - this.state.replyText.length}
                        </span>
                        <div class="statusUpdateInfoNButtonContainer">
                            {(this.state.replyComplete)?
                                <p 
                                    className={`infoMessage ${(this.state.replySuccessful)? "successMessage" : "errorMessage"}`}>
                                    {(this.state.replySuccessful)? this.successMessage : this.errorMessage}
                                </p> :
                                null
                            }
                            <button 
                                id="submitReplyButton"
                                className="uiButton"
                                type="submit"
                                onClick={this.handleSubmitReply}
                                disabled={(this.state.replyInProgress || this.state.replyText.length <= 0)}>Submit Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReplyToTweetModalUI.prototype.errorMessage = "Something went wrong...Please try again.";
ReplyToTweetModalUI.prototype.successMessage = "Your reply was successfully posted!";

export default ReplyToTweetModalUI;