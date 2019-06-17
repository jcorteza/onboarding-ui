import {shallow} from "enzyme";
import UserContainer from "../components/UserContainer.jsx";

test("userContainer renders diff versions based on props", () => {
    let userContainer = shallow(<UserContainer />);
    
    expect(UserContainer).toHaveBeenCalled();
    expect(userContainer.props).toBeFalsy();
    expect(userContainer.render).toHaveReturnedWith(
        <div className="userDiv">
            <img src="../assets/img/twitter-logo.png" alt="twitter logo image" />
            <p className="name">Unknown User</p>
        </div>
    );
    
    userContainer = shallow(<UserContainer profileImgUrl="www.picture.com" userName="Twitter User" userHandle="twitterUser"/>);
    
    expect(UserContainer).toHaveBeenCalled();
    expect(userContainer.props).toBeTruthy();
    expect(userContainer.render).toHaveReturnedWith(
        <div className="userDiv">
            <img src="www.picture.com" alt="User profile image"/>
            <p className="name">Twitter User</p>
            <p className="handle">twitterUser</p>
        </div> 
    );
});