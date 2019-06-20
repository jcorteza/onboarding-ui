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
        this.loadingMessage = "Loading your timeline...";

        this.fetchData = () => {
            fetchTimeline(this.props.timelineType)
            .then((data) => {
                console.log("fetch data complete. will updatStatus");
                this.updateStatus(data);
            })
            .catch((error) => {
                console.log(`Error occurred during fetchData: ${error}`);
                this.updateStatus("");
            });
        }

        this.updateStatus = (responseData) => {
            console.log(responseData);
            if(responseData === "") {
                console.log("errorOccurred");
                this.setState({
                    fetchComplete: true,
                    errorOccurred: true
                });
            } else {
                console.log("errorOccurred false");
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
                fetchComplete: false,
                errorOccurred: false
            });
            this.fetchData();
        }
    }

    componentDidMount() {
        console.log("comonent did mount. will now fetch Data");
        this.fetchData();
    }

    componentDidUpdate() {
        console.log("timelineContainer did update");
        console.log(`new State: ${JSON.stringify(this.state)}`);
    }

    render() {
        let buttonText = (this.props.timelineType === "home")?
            "View Twitter Timeline" :
            "View Your Tweets";
        let thisState = this.state;
        let timelineContainer;
        
        if(!thisState.fetchComplete) {
            timelineContainer = (
                <div id={`${this.props.timelineType}TimelineContainer`} className="timelineContainer">
                    <p>{this.loadingMessage}</p>
                </div>
            );
        } else if (thisState.fetchComplete && thisState.errorOccurred) {
            timelineContainer = (
                <div id={`${this.props.timelineType}TimelineContainer`} className="timelineContainer">
                    <p>{this.errorMessage}</p>
                </div>
            );
        } else if (thisState.fetchComplete && !thisState.errorOccurred) {
            let fillerMessage = (this.props.timelineType === "home")?
                "No tweets are available. Follow someone on Twitter." :
                "No tweets are available. Post a tweet!"
            timelineContainer = (thisState.data.length === 0)?
                <p>{fillerMessage}</p> :
                <div id={`${this.props.timelineType}TimelineContainer`} className="timelineContainer">
                    {thisState.data.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div>;
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