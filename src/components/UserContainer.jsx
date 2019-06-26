import React, { Component } from "react";
class UserContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let handle = (this.props.userHandle === undefined)?
            null :
            <p className="handle">{this.props.userHandle}</p>;

        return (this.props.hasOwnProperty("userName") && this.props.hasOwnProperty("userHandle"))?
            <div className="userDiv">
                <img src={this.props.profileImgUrl} alt="User profile image"/>
                <p className="name">{this.props.userName}</p>
                {handle}
            </div> :
            <div className="userDiv">
                <img src={require("../assets/img/twitter-logo.png")} alt="twitter logo image" />
                <p className="name">Unknown User</p>
            </div>;
    }
}

export default UserContainer;