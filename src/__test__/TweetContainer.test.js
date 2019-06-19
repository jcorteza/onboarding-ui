import React from "react";
import { shallow } from "enzyme";
import TweetContainer from "../components/TweetContainer.jsx";
import UserContainer from "../components/UserContainer.jsx";
import StatusContainer from "../components/StatusContainer.jsx";

describe("<TweetContainer />", () => {
    
    let testDate = new Date();
    let url = "www.post.com";
    let testMessage = "test message";
    
    test("renders with data from props not including user", () => {
        let tweetContainer = shallow(<TweetContainer postUrl={url} message={testMessage} createdAt={testDate.valueOf()}/>);
        
        expect(tweetContainer.instance().props).not.toHaveProperty("user");
        expect(tweetContainer.getElement()).toEqual(
            <div className="tweetContainer">
                <UserContainer />
                <StatusContainer postUrl={url} message={testMessage} date={new Date(testDate.valueOf())}/>
            </div>
        );
    });
    
    test("renders with data from props including user", () => {
        
        let userObject = {
            name: "Twitter User", 
            twHandle: "twitterUser", 
            profileImageUrl: "www.profilePic.com"
        };
        let tweetContainer = shallow(<TweetContainer postUrl={url} message={testMessage} createdAt={testDate.valueOf()} user={userObject}/>);
        
        expect(tweetContainer.instance().props).toHaveProperty("user");
        expect(tweetContainer.getElement()).toEqual(
            <div className="tweetContainer">
                <UserContainer userName={userObject.name} userHandle={userObject.twHandle} profileImgUrl={userObject.profileImageUrl}/>
                <StatusContainer postUrl={url} message={testMessage} date={new Date(testDate.valueOf())}/>
            </div>
        );

    });

});