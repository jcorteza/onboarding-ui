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
        this.refs.postTweetButton.setAttribute("disabled", true);
        this.setState({ postAttemptComplete: false }, () => {

            postTweetToTimeline(this.state.tweetText)
                .then((response) => {
    
                    if(response.successful) {
    
                        this.setState({ tweetText : "" });
    
                    }
    
                    this.setState({
                        successfulPost: response.successful,
                    });
    
                })
                .catch((error) => {

                    console.log(error);
                    this.setState({ successfulPost: false });

                })
                .finally(() => {

                    this.setState({ postAttemptComplete: true }, () => {

                        setTimeout(() => {
                            this.setState({ postAttemptComplete: false });
                        }, 3000);
                        this.refs.postTweetButton.setAttribute("disabled", false);
                        
                    });
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
                    <span id="charCountDiv">{this.state.tweetText.length}</span>
                </textarea>
                <button 
                    id="postTweetButton" 
                    className="uiButton"
                    ref="postTweetButton"
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