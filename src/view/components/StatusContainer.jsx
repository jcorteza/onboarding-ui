import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import getFormattedDate from "../../utils/getFormattedDate.js";

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
                        <FontAwesomeIcon 
                            icon={faReply} 
                            className="replyIcon"
                            onClick={this.props.handleClick} />
                    </div> :
                    null
                }
            </div>
        );
    }
}

export default StatusContainer;