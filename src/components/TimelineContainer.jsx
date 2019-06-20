import fetchTimeline from "../js/fetchTimeline.js";
import React, { Component } from "react";
import TweetContainer from "./TweetContainer.jsx";

class TimelineContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            fetchComplete: false,
            errorOccurred: false
        }
        
        this.errorMessage = "This content is not currently available. Please try again later.";
        this.fillerMessage = "Loading your timeline...";

        this.fetchData = () => {
            fetchTimeline(this.props.timelineType)
            .then((data) => {
                this.updateStatus(data);
            })
            .catch((error) => {
                console.log(`Error occurred during fetchData: ${error}`);
                this.updateStatus([]);
            });
        }

        this.updateStatus = (responseData) => {
            if(responseData.length === 0) {
                this.setState({
                    data: responseData,
                    fetchComplete: true,
                    errorOccurred: true
                });
            } else {
                this.setState({
                    data: responseData,
                    fetchComplete: true,
                    errorOccurred: false
                });
            }
        }

        this.handleClick = (e) => {
            e.preventDefault();
            this.setState({
                data: [],
                fetchComplete: false,
                errorOccurred: false
            });
            this.fetchData();
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        let buttonText = (this.props.timelineType === "home")?
            "View Twitter Timeline" :
            "View Your Tweets";
        let thisState = this.state;
        let timelineContainer;
        
        if(!thisState.fetchComplete) {
            timelineContainer = (
                <div id={`${this.props.timelineType}TimelineContainer`}>
                    <p>{this.fillerMessage}</p>
                </div>
            );
        } else if (thisState.fetchComplete && thisState.errorOccurred) {
            timelineContainer = (
                <div id={`${this.props.timelineType}TimelineContainer`}>
                    <p>{this.errorMessage}</p>
                </div>
            );
        } else if (thisState.fetchComplete && !thisState.errorOccurred)
        if(thisState.errorOccurred === true) {
        } else if(thisState.errorOccurred === false && thisState.data.length > 0) {
            timelineContainer = (
                <div id={`${this.props.timelineType}TimelineContainer`}>
                    {this.state.data.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div> 
            );
        } else if (this.state.errorOccurred === false) {
        }

        return (
            <div className="apiContainer">
                <button className="apiButton" type="button" onClick={this.handleClick}>{buttonText}</button>
                {timelineContainer}
            </div>
        );
    }
}

export default TimelineContainer;