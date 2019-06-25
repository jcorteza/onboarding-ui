import React from "react";
import { shallow } from "enzyme";
import UserTimelineAPIContainer from "../components/UserTimelineAPIContainer";
import fetchUserTimeline from "../js/fetchUserTimeline";

jest.mock("../js/fetchUserTimeline", () => jest.fn().mockResolvedValue(""));

describe("UserTimelineAPIContainer", () => {
    const userAPIContainer = shallow(<UserTimelineAPIContainer timelineType="home"/>);
    const errorMessage = (<p>{userAPIContainer.instance().errorMessage}</p>);
    const loadingMessage = (<p>{userAPIContainer.instance().loadingMessage}</p>);

    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders stand in p-tag and triggers requestHandler", () => {
        
        expect(fetchUserTimeline).toHaveBeenCalled();
        expect(userAPIContainer.containsMatchingElement(errorMessage)).toBeTruthy();
        
    });
    
    // it("simulates button click, triggers requestHandler and renders errorMessage", () => {

    //     expect(userAPIContainer.containsMatchingElement(errorMessage)).toBeTruthy();

    //     fetchUserTimeline.mockResolvedValue("");
    //     userAPIContainer
    //         .find("button")
    //         .simulate("click", {preventDefault: () => {}});

    //     expect(fetchUserTimeline).toHaveBeenCalled(); 
    //     expect(userAPIContainer.containsMatchingElement(loadingMessage)).toBeTruthy();
        
    // });
    
    // it("simulates button click, triggers requestHandler and renders timeline", () => {
        
    //     let testData = {
    //         postUrl: "www.twitter.com",
    //         message: "test message",
    //         createdAt: Date.now().valueOf(),
    //         user: {
    //             name: "Twitter User",
    //             twHandle: "twUser",
    //             profileImageUrl: "picture.com"
    //         }
    //     };
    //     let expectedDiv = (
    //         <div className="userAPIContainer">
    //             <TweetContainer key={testData.postUrl} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt} user={testData.user} />
    //             <TweetContainer key={testData.postUrl} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt} user={testData.user}/>
    //         </div>
    //     );
        
    //     fetchUserTimeline.mockResolvedValue([testData, testData]);
    //     userAPIContainer
    //         .find("button")
    //         .simulate("click", {preventDefault: () => {}});

    //     expect(userAPIContainer.containsMatchingElement(<p>{userAPIContainer.instance().loadingMessage}</p>)).toBeTruthy();
    //     expect(fetchUserTimeline).toHaveBeenCalled();
        
    //     return fetchUserTimeline("home")
    //         .then((response) => {
    //             userAPIContainer.instance().updateStatus(response);
    //             userAPIContainer.update();
    //             expect(userAPIContainer.childAt(1).getElement()).toMatchObject(expectedDiv);
    //         });
    // });
});