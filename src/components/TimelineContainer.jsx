import React, { Component } from "react";
import requestHandler from "../js/requestHandler.js";
import TweetContainer from "./TweetContainer.jsx";

class TimelineContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            errorOccurred: false
        }

        this.updateStatus = (responseData) => {
            if(responseData === "") {
                this.setState({
                    data: [],
                    errorOccurred: true
                });
            } else {
                this.setState({
                    data: JSON.parse(responseData),
                    errorOccurred: false
                });
            }
        }

        this.handleClick = (e) => {
            e.preventDefault();
            this.setState({
                data: [],
                errorOccurred: false
            })
            requestHandler(this.updateStatus);
        }
    }

    componentDidMount() {
        requestHandler(this.updateStatus);
    }

    render() {
        let timelineContainer;
        if(this.state.errorOccurred === true) {
            timelineContainer = (
                <div id="timelineContainer">
                    <p>This content is not currently available. Please try again later.</p>
                </div>
            );
        } else if(this.state.errorOccurred === false && this.state.data.length > 0) {
            timelineContainer = (
                <div id="timelineContainer">
                    {this.state.data.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div> 
            );
        } else if (this.state.errorOccurred === false) {
            timelineContainer = (
                <div id="timelineContainer">
                    <p>Loading your Twitter timeline...</p>
                </div>
            );
        }

        return (
            <div id="apiContainer">
                <button id="apiButton" type="button" onClick={this.handleClick}>Get Twitter Timeline</button>
                {timelineContainer}
            </div>
        );
    }
}

export default TimelineContainer;