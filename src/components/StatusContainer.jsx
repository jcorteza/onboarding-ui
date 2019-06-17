import React, { Component } from "react";
import getFormattedDate from "../js/getFormattedDate.js";

class StatusContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="textDiv">
                <p>{getFormattedDate(this.props.date)}</p>
                <a href={this.props.postUrl} target="_blank">
                    <p>{this.props.message}</p>
                </a>
            </div>
        );
    }
}

export default StatusContainer;