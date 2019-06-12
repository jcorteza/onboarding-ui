import sendRequest from "../js/sendRequest.js";

class GetTimelineButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <button id="apiButton" type="button" onClick={
                (e) => {
                    e.preventDefault();
                    document.getElementById("timelineContainer").innerHTML = "<p>Loading your Twitter timeline...</p>";
                    sendRequest(this.props.request)
                }
            }>Get Twitter Timeline</button>
        );
    }
}

export default GetTimelineButton;