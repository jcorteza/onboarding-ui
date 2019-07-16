import React, { Component } from "react";
import UserContainer from "./UserContainer.jsx";
import StatusContainer from "./StatusContainer.jsx";

class TweetContainer extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let tweetData = {
            message: this.props.message,
            createdAt: this.props.createdAt,
            statusID: this.props.statusID,
            postUrl: this.props.postUrl,
            user: this.props.user
        }

        this.props.replyBtnClicked(tweetData);
    }

    render() {
        let dateObject = new Date(this.props.createdAt);
        let userDiv = (this.props.hasOwnProperty("user"))? 
            <UserContainer 
                userName={this.props.user.name} 
                userHandle={this.props.user.twHandle} 
                profileImgUrl={this.props.user.profileImageUrl} /> :
            <UserContainer />;

        return( 
            <div className="tweetContainer">
                {userDiv}
                <StatusContainer 
                    postUrl={this.props.postUrl} 
                    message={this.props.message} 
                    date={dateObject}
                    replyBtnClicked={this.props.replyBtnClicked}
                    handleClick={this.handleClick} />
            </div>
        );
    }
}

export default TweetContainer;