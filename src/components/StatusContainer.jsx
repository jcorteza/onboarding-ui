import React, { Component } from "react";
import getFormattedDate from "../utils/getFormattedDate.js";

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
            </div>
        );
    }
}

export default StatusContainer;