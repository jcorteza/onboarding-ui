import React, { Component } from "react";
import TweetContainer from "./TweetContainer.jsx";
import fetchHomeTimeline from "../js/fetchHomeTimeline.js/index.js";

class UserTimelineContainer extends Component {
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
            fetchHomeTimeline()
            .then((data) => {
                this.updateStatus(data);
            })
            .catch((error) => {
                console.log(`Error occurred during UserTimelineContainer fetchData: ${error}`);
                this.updateStatus("");
            });
        }

        this.updateStatus = (responseData) => {
            if(responseData === "") {
                this.setState({
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
        let thisState = this.state;
        let timelineContainer;
        
        if(!thisState.fetchComplete) {
            timelineContainer = (
                <div className="timelineContainer">
                    <p>{this.loadingMessage}</p>
                </div>
            );
        } else if (thisState.fetchComplete && thisState.errorOccurred) {
            timelineContainer = (
                <div className="timelineContainer">
                    <p>{this.errorMessage}</p>
                </div>
            );
        } else if (thisState.fetchComplete && !thisState.errorOccurred) {
            timelineContainer = (thisState.data.length === 0)?
                <p>No tweets are available. Post a tweet!</p> :
                <div className="timelineContainer">
                    {thisState.data.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div>;
        }

        return (
            <div className="apiContainer" id="UserTimelineContainer">
                <h2>User Timeline</h2>
                <button className="apiButton" type="button" onClick={this.handleClick}>View User Timeline</button>
                {timelineContainer}
            </div>
        );
    }
}

export default UserTimelineContainer;