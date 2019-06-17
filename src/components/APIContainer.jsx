import GetTimelineButton from "./GetTimelineButton.jsx";
import TimelineContainer from "./TimelineContainer.jsx";
import requestHandler from "../js/requestHandler.js";

class APIContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            request: new XMLHttpRequest(),
            status: 0,
            ajaxResponse: []
        }
    }

    componentDidMount() {
        requestHandler.initRequest(this.state.request, () => {
            if(this.state.request.status === 200) {
                this.setState({
                    ajaxResponse: JSON.parse(this.state.request.response),
                    status: this.state.request.status
                });
            } else {
                this.setState({
                    ajaxResponse: [],
                    status: this.state.request.status
                });
            }
        });
    }

    render() {        
        return( 
            <div id="apiContainer">
                <GetTimelineButton request={this.state.request}/>
                <TimelineContainer request={this.state.request} response={this.state.ajaxResponse} status={this.state.status}/>
            </div>
        );
    }
}

export default APIContainer;