import requestHandler from "../js/requestHandler.js";
import TweetContainer from "./TweetContainer.jsx";

class TimelineContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            response: props.request.response
        }
    }

    componentDidMount() {

    }

    shouldComponentUpdate() {

    }

    componentDidUpdate() {

    }

    render() {
        if (this.state.response === [] || this.state.response == null) {
            return(
                <div id="timelineContainer">
                    <p>Loading your Twitter timeline...</p>
                </div> 
            ); 
        } else if(this.props.request.readyState === 4 && this.props.request.state !== 200) {
            return(
                <div id="timelineContainer">
                    <p>This content is not currently available. Please try again later.</p>
                </div>
            );
        } else if(this.props.readyState === 4 && this.props.request.state === 200) {
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