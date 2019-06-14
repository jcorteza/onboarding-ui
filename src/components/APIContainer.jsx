import GetTimelineButton from "./GetTimelineButton.jsx";
import TimelineContainer from "./TimelineContainer.jsx";
import requestHandler from "../js/requestHandler.js";

class APIContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            request: new XMLHttpRequest(),
            ajaxResponse: [],
            processFinished: false,
            errorOccured: false
        }
    }

    componentDidMount() {
        requestHandler.initRequest(this.state.request);
    }

    render() {        
        return( 
            <div id="apiContainer">
                <GetTimelineButton request={this.state.request}/>
                <TimelineContainer request={this.state.request} response={this.state.ajaxResponse} error={this.state.errorOccured} finished={this.state.processFinished}/>
            </div>
        );
    }
}

export default APIContainer;