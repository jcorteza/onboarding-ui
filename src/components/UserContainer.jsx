class UserContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (this.props)?
            <div className="userDiv">
                <img src={this.props.profileImgUrl} alt="User profile image"/>
                <p className="name">{this.props.userName}</p>
                <p className="handle">{this.props.userHandle}</p>
            </div> :
            <div className="userDiv">
                <img src={require("../img/twitter-logo.png")} alt="twitter logo image" />
                <p className="name">Unknown User</p>
            </div>;
    }
}

export default UserContainer;