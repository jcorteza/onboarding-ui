import {shallow} from "enzyme";
import TweetContainer from "../components/TweetContainer.jsx";

test("", () => {
    let testDate = new Date();
    let tweetContainer = shallow(<TweetContainer postUrl="www.post.com" message="test message" date={testDate}/>);
    
    expect(tweetContainer.props.user).toBeFalsy();
    expect(tweetContainer.render).toHaveReturnedWith(
        <div className="tweetContainer">
            <UserContainer />
            <StatusContainer postUrl="www.post.com" message="test message" date={testDate}/>
        </div>
    );
    
    tweetContainer = shallow(<TweetContainer postUrl="www.post.com" message="test message" date={testDate} user={{name: "Twitter User", twHanlde: "twitterUser", profileImgUrl: "www.profilePic.com"}}/>);
    
    expect(tweetContainer.props.user).toBeTruthy();
    expect(tweetContainer.render).toHaveReturnedWith(
        <div className="tweetContainer">
            <UserContainer userName="Twitter User" userHandle="twitterUser" profileImgUrl="www.profilePic.com"/> :
            <StatusContainer postUrl="www.post.com" message="test message" date={testDate}/>
        </div>
    );
});