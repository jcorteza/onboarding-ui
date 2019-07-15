import React, { Component } from "react";
import getFormattedDate from "../../utils/getFormattedDate.js";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";

class StatusContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="textDiv">
                <span className="dateSpan">{getFormattedDate(this.props.date)}</span>
                <a className="tweetLink" href={this.props.postUrl} target="_blank">
                    <p className="tweetText">{this.props.message}</p>
                </a>
                {(this.props.replyBtnClicked !== undefined)?
                    <div className="replyIconContainer">
                        <i 
                            className="fas fa-reply replyIcon"
                            onClick={this.props.handleClick}></i>
                    </div> :
                    null
                }
            </div>
        );
    }
}

export default StatusContainer;