import sendRequest from "../js/sendRequest.js";

class GetTimelineButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <button id="apiButton" type="button" onClick={() => sendRequest(props.request)}>Get Twitter Timeline</button>;
    }
}

export default GetTimelineButton;