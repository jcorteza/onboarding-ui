import GetTimelineButton from "./GetTimelineButton.jsx";
import TimelineContainer from "./TimelineContainer.jsx";

class APIContainer extends React.Component {
    render() {
        const request = new XMLHttpRequest();

        return( 
            <div id="apiContainer">
                <GetTimelineButton request={request}/>
                <TimelineContainer request={request}/>
            </div>
        );
    }
}

export default APIContainer;