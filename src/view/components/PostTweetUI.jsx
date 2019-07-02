import React, { Component } from "react";
import postTweetToTimeline from "../../service/postTweetToTimeline";

class PostTweetUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweetText: "",
            successfulPost: false,
            postAttemptComplete: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ tweetText: e.target.value });
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ postAttemptComplete: false });
        postTweetToTimeline(this.state.tweetText)
            .then((response) => {
                console.log(response);

                this.setState({
                    successfulPost: response.successful,
                    postAttemptComplete: true
                });

            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    successfulPost: false,
                    postAttemptComplete: true
                });
            });
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
                <button 
                    id="postTweetButton" 
                    className="uiButton"
                    type="submit" 
                    onClick={this.handleClick}
                    disabled={(this.state.tweetText.length > 0)? false : true}
                >Post Tweet</button>
                {(this.state.postAttemptComplete)?
                    <p id="postTweetInfoMessage">{(this.state.successfulPost)? this.successMessage : this.errorMessage}</p> :
                    null
                }
            </div>
        );
    }
}

PostTweetUI.prototype.successMessage = "Your tweet was successfully posted!";
PostTweetUI.prototype.errorMessage = "Something went wrong. Please try again.";


export default PostTweetUI;