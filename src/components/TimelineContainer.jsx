import fetchTimeline from "../js/fetchTimeline.js";
import React, { Component } from "react";
import TweetContainer from "./TweetContainer.jsx";

class TimelineContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            errorOccurred: false
        }
        
        this.errorMessage = "This content is not currently available. Please try again later.";
        this.fillerMessage = "Loading your Twitter timeline...";

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
                    errorOccurred: true
                });
            } else {
                this.setState({
                    data: responseData,
                    errorOccurred: false
                });
            }
        }

        this.handleClick = (e) => {
            e.preventDefault();
            this.setState({
                data: [],
                errorOccurred: false
            });
            this.fetchData();
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        let timelineContainer;
        if(this.state.errorOccurred === true) {
            timelineContainer = (
                <div id={`${this.props.timelineType}TimelineContainer`}>
                    <p>{this.errorMessage}</p>
                </div>
            );
        } else if(this.state.errorOccurred === false && this.state.data.length > 0) {
            timelineContainer = (
                <div id={`${this.props.timelineType}TimelineContainer`}>
                    {this.state.data.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div> 
            );
        } else if (this.state.errorOccurred === false) {
            timelineContainer = (
                <div id={`${this.props.timelineType}TimelineContainer`}>
                    <p>{this.fillerMessage}</p>
                </div>
            );
        }

        return (
            <div className="apiContainer">
                <button className="apiButton" type="button" onClick={this.handleClick}>Get Twitter Timeline</button>
                {timelineContainer}
            </div>
        );
    }
}

export default TimelineContainer;