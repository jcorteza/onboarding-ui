import sendRequest from "../js/sendRequest.js";
import TweetContainer from "./TweetContainer.jsx";

class TimelineContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ajaxResponse: []
        }
    }

    componentDidMount() {
        this.props.request.addEventListener("load", () => {
        
            document.getElementById("timelineContainer").innerHTML = "";
            this.setState({ajaxResponse: JSON.parse(this.props.request.response)});
        });
    
        this.props.request.addEventListener("error", () => {
            document.getElementById("timelineContainer").innerHTML = "<p>This content is not currently available. Please try again later.</p>";
            this.setState({ajaxResponse: []});
        });

        sendRequest(this.props.request);
    }

    render() {
        return (this.state.ajaxResponse.length > 0)?
            <div id="timelineContainer">
                {this.state.ajaxResponse.map(status => 
                    <TweetContainer user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                )}
            </div> :
            <div id="timelineContainer">
                <p>Loading your Twitter timeline...</p>
            </div>;
    }
}

export default TimelineContainer;