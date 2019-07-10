import React, { Component } from "react";
import postReplyToTweet from "../../service/postReplyToTweet";

class ReplyToTweetModuleUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            replyText: "",
            replyInProgress: false,
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
            
            postReplyToTweet(this.state.replyText, this.props.replyToID)
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
 
                    this.setState({ replyInProgress: false});

                });

        });
    }

    render() {
        <div id="replyToTweetModule">
            <span id="closeModuleIcon">X</span>
            {/* tweet container from TimelineContainer */ }
            <textarea 
                id="replyToTweetTextarea"
                placeholder="Your reply..."
                value="" 
                onChange={this.handleTextChange}
                disabled={this.state.replyInProgress}></textarea>
            <button id="cancelReplyButton" type="button">Cancel</button>
            <button 
                id="submitReplyButton"
                type="submit"
                onClick={this.handleSubmitReply}
                disabled={(this.state.replyInProgress || this.state.replyText.length <= 0)}>To Implement</button>
        </div>
    }
}

export default ReplyToTweetModuleUI;