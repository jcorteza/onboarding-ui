import sendRequest from "../js/sendRequest.js";

class GetTimelineButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    render() {
        return( 
            <button id="apiButton" type="button" onClick={
                (e) => {
                    e.preventDefault();
                    this.setState({count: this.state.count++});
                    sendRequest(this.props.request)
                }
            }>Get Twitter Timeline</button>
        );
    }
}

export default GetTimelineButton;