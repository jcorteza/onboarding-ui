import requestHandler from "../js/requestHandler.js";

class GetTimelineButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <button id="apiButton" type="button" onClick={
                (e) => {
                    e.preventDefault();
                    requestHandler.sendRequest(this.props.request)
                }
            }>Get Twitter Timeline</button>
        );
    }
}

export default GetTimelineButton;