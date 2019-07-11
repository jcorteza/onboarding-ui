import React, { Component } from "react";
import UserContainer from "./UserContainer.jsx";
import StatusContainer from "./StatusContainer.jsx";

class TweetContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let userDiv = (this.props.hasOwnProperty("user"))? 
            <UserContainer userName={this.props.user.name} userHandle={this.props.user.twHandle} profileImgUrl={this.props.user.profileImageUrl}/> :
            <UserContainer />;

        return( 
            <div className="tweetContainer">
                {userDiv}
                <StatusContainer postUrl={this.props.postUrl} message={this.props.message} date={new Date(this.props.createdAt)}/>
                <div id="btnContainer">
                    <button className="replyBtn" type="button" onClick={this.props.replyBtnClicked}>Reply</button>
                </div>
            </div>
        );
    }
}

export default TweetContainer;