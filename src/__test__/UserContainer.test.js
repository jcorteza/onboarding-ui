import React from "react";
import { shallow } from "enzyme";
import UserContainer from "../view/components/UserContainer.jsx";

describe("<UserContainer />", () => {
    test("renders without props", () => {
        
        let userContainer = shallow(<UserContainer />);
    
        expect(userContainer.instance().props).not.toHaveProperty("profileImgUrl");
        expect(userContainer.instance().props).not.toHaveProperty("userName");
        expect(userContainer.instance().props).not.toHaveProperty("userHandle");
        expect(userContainer.getElement()).toEqual(
            <div className="userDiv">
                <img className="userImg" src={require("../assets/img/twitter-logo.png")} alt="twitter logo image" />
                <p className="name">Unknown User</p>
            </div>
        );

    });

    test("renders with props", () => {

        let userContainer = shallow(<UserContainer profileImgUrl="www.picture.com" userName="Twitter User" userHandle="twitterUser"/>);

        expect(userContainer.instance().props).toHaveProperty("profileImgUrl", "www.picture.com");
        expect(userContainer.instance().props).toHaveProperty("userName", "Twitter User");
        expect(userContainer.instance().props).toHaveProperty("userHandle", "twitterUser");
        expect(userContainer.getElement()).toEqual(
            <div className="userDiv">
                <img className="userImg" src="www.picture.com" alt="User profile image"/>
                <p className="name">Twitter User</p>
                <p className="handle">twitterUser</p>
            </div> 
        );
    });
});