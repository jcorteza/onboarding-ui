import React, { Component } from "react";
import TimelineContainer from "./TimelineContainer.jsx";
import ReplyToTweetModuleUI from "./ReplyToTweetModuleUI";
import fetchUserTimeline from "../../service/fetchUserTimeline.js";

class UserTimelineUIContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            fetchComplete: false,
            errorOccurred: false,
            replyBtnClicked: false
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

        this.handleReplyClick = () => {
            let currentState = this.state.replyBtnClicked;
            this.setState({ replyBtnClicked: !currentState });
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className="uiContainer" id="userTimelineUIContainer">
                {(this.state.replyBtnClicked)?
                    <ReplyToTweetModuleUI /> :
                    null
                }
                <button 
                    className="uiButton" 
                    type="button" 
                    onClick={this.handleClick}>
                        View User Timeline
                </button>
                <TimelineContainer 
                    data={this.state.data}
                    fetchComplete={this.state.fetchComplete}
                    errorOccurred={this.state.errorOccurred}
                    fillerMessage={this.fillerMessage}
                    replyBtnClicked={this.handleReplyClick}/>
            </div>
        );
    }
}

UserTimelineUIContainer.prototype.fillerMessage = "No tweets are available. Post a tweet!";

export default UserTimelineUIContainer;