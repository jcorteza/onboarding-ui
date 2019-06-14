import GetTimelineButton from "./GetTimelineButton.jsx";
import TimelineContainer from "./TimelineContainer.jsx";
import requestHandler from "../js/requestHandler.js";

class APIContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            request: new XMLHttpRequest()
        }
    }

    render() {        
        return( 
            <div id="apiContainer">
                <GetTimelineButton request={this.state.request}/>
                <TimelineContainer request={this.state.request}/>
            </div>
        );
    }
}

export default APIContainer;