import React, { Component } from "react";
import TimelineContainer from "./TimelineContainer.jsx";
import fetchUserTimeline from "../js/fetchUserTimeline.js";

class UserTimelineAPIContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            fetchComplete: false,
            errorOccurred: false
        }
        
        this.fillerMessage = "No tweets are available. Post a tweet!";

        this.fetchData = () => {
            fetchUserTimeline()
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
        return (
            <div className="apiContainer" id="userTimelineAPIContainer">
                <h2>User Timeline</h2>
                <button className="apiButton" type="button" onClick={this.handleClick}>View User Timeline</button>
                <TimelineContainer data={this.state.data} fetchComplete={this.state.data} errorOccurred={this.errorOccurred} fillerMessage={this.fillerMessage}/>
            </div>
        );
    }
}

export default UserTimelineAPIContainer;