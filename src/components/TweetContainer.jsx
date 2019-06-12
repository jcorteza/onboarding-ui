import UserContainer from "./UserContainer.jsx";
import StatusContainer from "./StatusContainer.jsx";

class TweetContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props
        }
    }

    render() {
        return 
            <div class="tweetContainer">
                <UserContainer />
                <StatusContainer />
            </div>
    }
}

export default TweetContainer;