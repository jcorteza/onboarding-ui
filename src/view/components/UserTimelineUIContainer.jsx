import React, { Component } from "react";
import TimelineContainer from "./TimelineContainer.jsx";
import fetchUserTimeline from "../../service/utils/fetchUserTimeline.js";

class UserTimelineUIContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            fetchComplete: false,
            errorOccurred: false
        }

        this.fetchData = () => {
            fetchUserTimeline()
                .then((responseData) => {
                    let updatedData = responseData.map(status => ({
                        message: status.message,
                        user: {
                            name: status.user.name,
                            profileImageUrl: status.user.profileImageUrl
                        },
                        createdAt: status.createdAt,
                        postUrl: status.postUrl
                    }));


                    this.setState({
                        data: updatedData,
                        fetchComplete: true,
                        errorOccurred: false
                    });

                })
                .catch((error) => {

                    console.log(`Error occurred during fetchUserTimeline: ${error}`);
                    this.setState({
                        fetchComplete: true,
                        errorOccurred: true
                    });

                });
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
        return (
            <div className="uiContainer" id="userTimelineUIContainer">
                <h2 className="timelineHeaderText">User Timeline</h2>
                <button className="uiButton" type="button" onClick={this.handleClick}>View User Timeline</button>
                <TimelineContainer data={this.state.data} fetchComplete={this.state.fetchComplete} errorOccurred={this.state.errorOccurred} fillerMessage={this.fillerMessage}/>
            </div>
        );
    }
}

UserTimelineUIContainer.prototype.fillerMessage = "No tweets are available. Post a tweet!";

export default UserTimelineUIContainer;