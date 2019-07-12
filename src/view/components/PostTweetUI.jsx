import React, { Component } from "react";
import postTweetToTimeline from "../../service/postTweetToTimeline";

class PostTweetUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweetText: "",
            successfulPost: false,
            postAttemptComplete: false,
            buttonDisabled: false,
            textareaDisabled: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        let textValue = e.target.value;
        this.setState({ tweetText: textValue });
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            buttonDisabled: true,
            textareaDisabled: true,
            postAttemptComplete: false
        }, () => {

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
    
                    this.setState({ 
                        postAttemptComplete: true,
                        buttonDisabled: false,
                        textareaDisabled: false
                    }, () => {
    
                        setTimeout(() => {
                            this.setState({ postAttemptComplete: false });
                        }, 3000);

                    });

                });

        });
    }

    render() {
        const charCountSpan = document.createElement("span");
        charCountSpan.setAttribute("id", "charCountSpan");
        charCountSpan.innerText = 280 - this.state.tweetText.length;

        return(
            <div id="postTweetUI">
                <textarea 
                    className="statusUpdateTextarea" 
                    autoFocus 
                    maxLength="280" 
                    placeholder="Hello followers..." 
                    value={this.state.tweetText}
                    onChange={this.handleChange}
                    disabled={this.state.textareaDisabled}
                    required></textarea>
                <span className="charCountSpan">Characters: {280 - this.state.tweetText.length}</span>
                <div className="statusUpdateInfoNButtonContainer">
                    {(this.state.postAttemptComplete)?
                        <p 
                            className={`infoMessage ${(this.state.successfulPost)? "successMessage" : "errorMessage"}`}>
                                {(this.state.successfulPost)? this.successMessage : this.errorMessage}
                        </p> :
                        null
                    }
                    <button 
                        id="postTweetButton" 
                        className="uiButton"
                        type="submit" 
                        onClick={this.handleClick}
                        disabled={!this.state.tweetText.length > 0 || this.state.buttonDisabled}>
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