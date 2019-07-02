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
                if(response.success) {

                    this.setState({
                        successfulPost: true,
                        postAttemptComplete: true
                    });

                } else {

                    this.setState({
                        successfulPost: false,
                        postAttemptComplete: true
                    });

                }
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
                {(this.state.postAttemptComplete)?
                    <p className="postTweetInfoMessage">{(this.state.successfulPost)? this.successMessage : this.errorMessage}</p> :
                    null
                }
                <button 
                    id="postTweetButton" 
                    type="submit" 
                    disabled={(this.state.tweetText.length > 0)? false : true}
                >Post Tweet</button>
            </div>
        );
    }
}

PostTweetUI.prototype.successMessage = "Your tweet was successfully posted!";
PostTweetUI.prototype.errorMessage = "Something went wrong. Please try again.";


export default PostTweetUI;