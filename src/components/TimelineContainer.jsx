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
        
            document.getElementById("apiDataContainer").innerHTML = "";
            this.setState({ajaxResponse: JSON.parse(request.response)});
        });
    
        this.props.request.addEventListener("error", () => {
            document.getElementById("apiDataContainer").innerHTML = "<p>This content is not currently available. Please try again later.</p>";
            this.setState({ajaxResponse: []});
        });

        sendRequest(props.request);
    }

    render() {
        return (this.state.ajaxResponse.length > 0)?
            <div id="apiDataContainer">
                {this.state.ajaxResponse.map(status => 
                    <TweetContainer user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                )}
            </div> :
            <div id="apiDataContainer">
                <p>Loading your Twitter timeline...</p>
            </div>;
    }
}

export default TimelineContainer;