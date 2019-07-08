import React, { Component } from "react";
import ReactDOM from "react-dom";
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
        this.postTweetButton = React.createRef();
        this.textareaElement = React.createRef();
    }
    
    handleChange(e) {
        let textValue = e.target.value;
        this.setState({ tweetText: textValue });
    }

    handleClick(e) {
        e.preventDefault();
        this.postTweetButton.current.disabled = true;
        this.textareaElement.current.disabled = true;
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
                        this.postTweetButton.current.removeAttribute("disabled");
                        this.textareaElement.current.removeAttribute("disabled");
                    });
                });

        });
    }

    render() {
        const charCountSpan = document.createElement("span");
        charCountSpan.setAttribute("id", "charCountSpan");
        charCountSpan.innerText = 280 - this.state.tweetText.length;

        return(
            <div id="postTweetDiv">
                <textarea 
                    id="postTweetTextArea" 
                    ref={this.textareaElement}
                    autoFocus 
                    maxLength="280" 
                    placeholder="Hello Followers" 
                    value={this.state.tweetText}
                    onChange={this.handleChange}
                    required
                ></textarea>
                <span id="charCountSpan">Characters: {280 - this.state.tweetText.length}</span>
                <div id="buttonContainer">
                    {(this.state.postAttemptComplete)?
                        <p 
                            id="postTweetInfoMessage" 
                            className={(this.state.successfulPost)? "successMessage" : "errorMessage"}>
                                {(this.state.successfulPost)? this.successMessage : this.errorMessage}
                        </p> :
                        null
                    }
                    <button 
                        id="postTweetButton" 
                        className="uiButton"
                        ref={this.postTweetButton}
                        type="submit" 
                        onClick={this.handleClick}
                        disabled={!this.state.tweetText.length > 0}>
                        Post Tweet
                    </button>
                </div>
            </div>
        );
    }
}

PostTweetUI.prototype.successMessage = "Your tweet was successfully posted!";
PostTweetUI.prototype.errorMessage = "Something went wrong. Please try again.";


export default PostTweetUI;