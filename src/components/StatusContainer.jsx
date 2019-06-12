import getFormattedDate from "../js/getFormattedDate.js";

class StatusContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return
            <div class="textDiv">
                <p>{getFormattedDate(this.props.date)}</p>
                <a href={this.props.postUrl} target="_blank">
                    <p>{this.props.message}</p>
                </a>
            </div>;
    }
}

export default StatusContainer;