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

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmitReply = this.handleSubmitReply.bind(this);
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
        <div className="modal" onClick={this.props.changeModalDisplay}>
            <div id="replyToTweetModalUI">
                <span id="closeModuleIcon" onClick={this.props.changeModalDisplay}>X</span>
                <div id="replyToTweetModalContent">
                    <TweetContainer 
                        user={this.props.tweetData.user}
                        postUrl={this.props.tweetData.postUrl}
                        message={this.props.tweetData.message}
                        createdAt={this.props.tweetData.createdAt} />
                    <textarea 
                        className="statusUpdateTextarea"
                        placeholder="Your reply..."
                        maxLength="280"
                        value="" 
                        onChange={this.handleTextChange}
                        disabled={this.state.replyInProgress}></textarea>
                    <span className="charCountSpan">Characters: {280 - this.state.replyText.length}</span>
                    <div class="statusUpdateInfoNButtonContainer">
                        {(this.state.replyComplete)?
                            <p class="infoMessage">{(this.state.replySuccessful)? this.successMessage : this.errorMessage}</p> :
                            null
                        }
                        <button 
                            id="submitReplyButton"
                            className="uiButton"
                            type="submit"
                            onClick={this.handleSubmitReply}
                            disabled={(this.state.replyInProgress || this.state.replyText.length <= 0)}>To Implement</button>
                    </div>
                </div>
            </div>
        </div>
    }
}

ReplyToTweetModalUI.prototype.errorMessage = "Something went wrong...Please try again.";
ReplyToTweetModalUI.prototype.successMessage = "Your reply was successfully posted!";

export default ReplyToTweetModalUI;