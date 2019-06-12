import sendRequest from "../js/sendRequest.js";
import TweetContainer from "./TweetContainer.jsx";

class TimelineContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ajaxResponse: [],
            error: false
        }
    }

    componentDidMount() {
        this.props.request.addEventListener("load", () => {
            this.setState({
                ajaxResponse: JSON.parse(this.props.request.response),
                error: false
            });
        });
    
        this.props.request.addEventListener("error", () => {
            this.setState({
                ajaxResponse: [],
                error: true
            });
        });

        sendRequest(this.props.request);
    }

    render() {
        if (this.props.request.readyState <= 1) {
            return(
                <div id="timelineContainer">
                    <p>Loading your Twitter timeline...</p>
                </div> 
            ); 
        } else if(this.props.request.readyState >= 2 && this.state.error === true) {
            return(
                <div id="timelineContainer">
                    <p>This content is not currently available. Please try again later.</p>
                </div>
            );
        } else if(this.props.request.readyState >= 2 && this.state.error === false) {
            return(
                <div id="timelineContainer">
                    {this.state.ajaxResponse.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div> 
            );
        }
    }
}

export default TimelineContainer;