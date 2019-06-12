import GetTimelineButton from "./GetTimelineButton.jsx";
import TimelineContainer from "./TimelineContainer.jsx";

class APIContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            request = new XMLHttpRequest(),
            ajaxResponse: []
        }
    }

    componentDidMount() {
        request.addEventListener("load", () => {
        
            apiDataContainer.innerHTML = "";
            this.setState({ajaxResponse: JSON.parse(request.response)});
        });
    
        request.addEventListener("error", () => {
            apiDataContainer.innerHTML = "<p>This content is not currently available. Please try again later.</p>";
        });
    }

    render() {
        return 
            <div>
                <GetTimelineButton request={this.state.request}/>
                <TimelineContainer request={this.state.request} response={this.state.ajaxResponse}/>
            </div>;
    }
}

export default APIContainer;