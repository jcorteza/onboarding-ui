import React, { Component } from "react";

class PostTweetUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweetText: ""
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ tweetText: e.target.value });
    }

    handleClick(e) {
        e.preventDefault();
        // api call
    }

    render() {
        return(
            <div id="postTweetDiv">
                <textarea 
                    id="postTweetTextArea" 
                    autofocus maxLength="280" 
                    placeholder="Hello Followers" 
                    value={this.state.tweetText}
                    onChange={this.handleChange}
                    required
                >
                    <div id="charCountDiv">{this.state.tweetText.length}</div>
                </textarea>
                <p className="postTweetInfoMessage"></p>
                <button id="postTweetButton" type="submit">Post Tweet</button>
            </div>
        );
    }
}

PostTweetUI.prototype.successMessage = "Your tweet was successfully posted!";
PostTweetUI.prototype.errorMessage = "Something went wrong. Please try again.";


export default PostTweetUI;