import GetTimelineButton from "./GetTimelineButton.jsx";
import TimelineContainer from "./TimelineContainer.jsx";

class APIContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            request: new XMLHttpRequest()
        }
    }

    componentDidMount() {
        
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