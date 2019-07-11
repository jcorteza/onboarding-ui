import React, { Component } from "react";
import TimelineContainer from "./TimelineContainer.jsx";
import ReplyToTweetModalUI from "./ReplyToTweetModalUI";
import fetchUserTimeline from "../../service/fetchUserTimeline.js";

class UserTimelineUIContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            fetchComplete: false,
            errorOccurred: false,
            modalDisplayed: false,
            modalData: {}
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

        this.changeModalDisplay = (tweetData) => {
            let currentState = this.state.modalDisplayed;

            if(!currentState == true) {
                
                this.setState({ 
                    modalDisplayed: !currentState,
                    modalData: tweetData
                });

            } else {

                this.setState({ modalDisplayed: !currentState });

            }
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className="uiContainer" id="userTimelineUIContainer">
                {(this.state.modalDisplayed)?
                    <ReplyToTweetModalUI 
                        changeModalDisplay={changeModalDisplay}
                        tweetData={this.state.tweetData}/> :
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
                    replyBtnClicked={this.changeModalDisplay}/>
            </div>
        );
    }
}

UserTimelineUIContainer.prototype.fillerMessage = "No tweets are available. Post a tweet!";

export default UserTimelineUIContainer;