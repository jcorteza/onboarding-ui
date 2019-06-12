import GetTimelineButton from "./GetTimelineButton.jsx";
import TimelineContainer from "./TimelineContainer.jsx";

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
        this.state.request.addEventListener("load", () => {
            this.setState({
                ajaxResponse: JSON.parse(this.state.request.response),
                errorOccured: false
            });
        });
    
        this.state.request.addEventListener("error", () => {
            this.setState({
                ajaxResponse: [],
                errorOccured: true
            });
        });

        this.state.request.addEventListener("readystatechange", () => {
            if(this.state.request.readyState <= 1) {
                this.setState({processFinished: false})
            } else if (this.state.request.readyState === 4) {
                this.setState({processFinished : true});
            }
        });
    }

    render() {
        const request = new XMLHttpRequest();
        
        return( 
            <div id="apiContainer">
                <GetTimelineButton request={this.state.request}/>
                <TimelineContainer request={this.state.request} response={this.state.ajaxResponse} error={this.state.errorOccured} finished={this.state.processFinished}/>
            </div>
        );
    }
}

export default APIContainer;