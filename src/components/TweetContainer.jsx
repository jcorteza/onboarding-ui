import UserContainer from "./UserContainer.jsx";
import StatusContainer from "./StatusContainer.jsx";

class TweetContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let userDiv = (this.props.user)? 
            <UserContainer userName={this.props.user.name} userHanlde={this.props.user.twHandle} profileImgUrl={this.props.user.profileImageUrl}/> :
            <UserContainer />;

        return( 
            <div class="tweetContainer">
                userDiv
                <StatusContainer postUrl={this.props.postUrl} message={this.props.message} date={new Date(this.props.createdAt)}/>
            </div>
        );
    }
}

export default TweetContainer;