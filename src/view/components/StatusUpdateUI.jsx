import React, { Component } from "react";

class StatusUpdateUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusText: "",
            statusPostInProgress: false,
            statusPostComplete: false,
            statusPostSuccessful: false,
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleTextChange(e) {
        this.setState({ statusText: e.target.value });
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ statusPostInProgress: true }, () => {
            
            this.props.postStatusUpdate(this.state.statusText, this.props.statusID)
                .then((response) => {

                    if(response.successful) {

                        this.setState({ statusText: "" });
                    }

                    this.setState({ statusPostSuccessful: response.successful });

                })
                .catch((err) => {

                    console.log(err);
                    this.setState({ statusPostSuccessful: false });

                })
                .finally(() => {
 
                    this.setState({ 
                        statusPostInProgress: false,
                        statusPostComplete: true
                    }, () => {

                        setTimeout(() => {
                            this.setState({ statusPostComplete: false });
                        }, 3000);

                    });

                });
        });
    }

    render() {
        return(
            <div className="statusUpdateUI">
                <textarea 
                    className="statusUpdateTextarea" 
                    placeholder="Your tweet text..." 
                    maxLength="280" 
                    value={this.state.statusText}
                    onChange={this.handleTextChange}
                    disabled={this.state.statusPostInProgress}
                    autoFocus></textarea>
                <span className="charCountSpan">Characters: {280 - this.state.statusText.length}</span>
                <div className="statusUpdateInfoNButtonContainer">
                    {(this.state.statusPostComplete)?
                        <p 
                            className={`infoMessage ${(this.state.statusPostSuccessful)? "successMessage" : "errorMessage"}`}>
                                {(this.state.statusPostSuccessful)? this.successMessage : this.errorMessage}
                        </p> :
                        null
                    }
                    <button 
                        className="uiButton submitStatusUpdateButton"
                        type="submit" 
                        onClick={this.handleClick}
                        disabled={(this.state.statusPostInProgress || this.state.statusText.length <= 0)}>
                        Post Tweet
                    </button>
                </div>
            </div>
        );
    }
}

StatusUpdateUI.prototype.errorMessage = "Something went wrong...Please try again.";
StatusUpdateUI.prototype.successMessage = "Your reply was successfully posted!";

export default StatusUpdateUI;