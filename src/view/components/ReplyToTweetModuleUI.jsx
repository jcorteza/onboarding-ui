import React, { Component } from "react";

class ReplyToTweetModuleUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            replyText: "",
            replyInProgress: false
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
            
            // call replyToTweet Service

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