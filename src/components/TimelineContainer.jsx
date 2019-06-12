import sendRequest from "../js/sendRequest.js";
import TweetContainer from "./TweetContainer.jsx";

class TimelineContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        sendRequest(props.request);
    }

    render() {
        return (props.response.length > 0)?
            <div id="apiDataContainer">
                {this.props.response.map(status => 
                    <TweetContainer user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                )}
            </div> :
            <div id="apiDataContainer">
                <p>Loading your Twitter timeline...</p>
            </div>;
    }
}

export default TimelineContainer;