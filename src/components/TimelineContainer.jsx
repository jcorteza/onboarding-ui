import fetchTimeline from "../js/fetchTimeline.js";
import TweetContainer from "./TweetContainer.jsx";

class TimelineContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            errorOccurred: false
        }

        this.fetchData = () => {
            fetchTimeline()
                .then((promiseResponse) => {
                    return promiseResponse.json();
                })
                .then((data) => {
                    this.updateStatus(data);
                })
                .catch((error) => {
                    console.log(error);
                    this.updateStatus([]);
                });
        }

        this.updateStatus = (responseData) => {
            if(responseData.length === 0) {
                this.setState({
                    data: responseData,
                    errorOccurred: true
                });
            } else {
                this.setState({
                    data: responseData,
                    errorOccurred: false
                });
            }
        }

        this.handleClick = (e) => {
            e.preventDefault();
            this.setState({
                data: [],
                errorOccurred: false
            })
            this.fetchData();
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        let timelineContainer;
        if(this.state.errorOccurred === true) {
            timelineContainer = (
                <div id="timelineContainer">
                    <p>This content is not currently available. Please try again later.</p>
                </div>
            );
        } else if(this.state.errorOccurred === false && this.state.data.length > 0) {
            timelineContainer = (
                <div id="timelineContainer">
                    {this.state.data.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div> 
            );
        } else if (this.state.errorOccurred === false) {
            timelineContainer = (
                <div id="timelineContainer">
                    <p>Loading your Twitter timeline...</p>
                </div>
            );
        }

        return (
            <div id="apiContainer">
                <button id="apiButton" type="button" onClick={this.handleClick}>Get Twitter Timeline</button>
                {timelineContainer}
            </div>
        );
    }
}

export default TimelineContainer;