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
        requestHandler.initRequest(requestHandler.request, () => {
            this.setState({readyState: requestHandler.request.readyState});
        });
        requestHandler.sendRequest(requestHandler.request);
    }

    render() {
        let timelineContainer = <div id="timelineContainer"></div>;
        if (this.state.readyState < 4) {
            timelineContainer = (
                <div id="timelineContainer">
                    <p>Loading your Twitter timeline...</p>
                </div> 
            ); 
        } else if(this.state.readyState  === 4 && requestHandler.request.status !== 200) {
            timelineContainer = (
                <div id="timelineContainer">
                    <p>This content is not currently available. Please try again later.</p>
                </div>
            );
        } else if(this.state.readyState  === 4 && requestHandler.request.status === 200) {
            timelineContainer = (
                <div id="timelineContainer">
                    {JSON.parse(requestHandler.request.response).map(status => 
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
                        requestHandler.sendRequest(requestHandler.request);
                    }
                }>Get Twitter Timeline</button>
                {timelineContainer}
            </div>
        );
    }
}

export default TimelineContainer;