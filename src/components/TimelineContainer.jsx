import sendRequest from "../js/sendRequest.js";
import TweetContainer from "./TweetContainer.jsx";

class TimelineContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        sendRequest(this.props.request);
    }

    render() {
        if (this.props.finished === false) {
            console.log("Loading your timeline");
            return(
                <div id="timelineContainer">
                    <p>Loading your Twitter timeline...</p>
                </div> 
            ); 
        } else if(this.props.finished === true && this.props.error === true) {
            console.log("state is === 4 error is true");
            return(
                <div id="timelineContainer">
                    <p>This content is not currently available. Please try again later.</p>
                </div>
            );
        } else if(this.props.finished == true && this.props.error === false) {
            console.log("state is === 4 error is false");
            return(
                <div id="timelineContainer">
                    {this.props.response.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div> 
            );
        }
    }
}

export default TimelineContainer;