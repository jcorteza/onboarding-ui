import requestHandler from "../js/requestHandler.js";
import TweetContainer from "./TweetContainer.jsx";

class TimelineContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            readyState: 0
        }
    }

    componentDidMount() {
        requestHandler.initRequest(() => {
            this.setState({readyState: requestHandler.request.readyState});
        });
        requestHandler.sendRequest();
    }

    render() {
        let timelineContainer = <div id="timelineContainer"></div>;
        if (requestHandler.request.readyState < 4) {
            timelineContainer = (
                <div id="timelineContainer">
                    <p>Loading your Twitter timeline...</p>
                </div> 
            ); 
        } else if(requestHandler.request.readyState  === 4 && requestHandler.request.status !== 200) {
            timelineContainer = (
                <div id="timelineContainer">
                    <p>This content is not currently available. Please try again later.</p>
                </div>
            );
        } else if(requestHandler.request.readyState  === 4 && requestHandler.request.status === 200) {
            timelineContainer = (
                <div id="timelineContainer">
                    {requestHandler.request.response.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div> 
            );
        }

        return (
            <div id="apiContainer">
                <button id="apiButton" type="button" onClick={
                    (e) => {
                        e.preventDefault();
                        requestHandler.sendRequest();
                    }
                }>Get Twitter Timeline</button>
                {timelineContainer}
            </div>
        );
    }
}

export default TimelineContainer;