import React from "react";
import { shallow } from "enzyme";
import HomeTimelineAPIContainer from "../components/HomeTimelineAPIContainer";
import fetchHomeTimeline from "../js/fetchHomeTimeline";

jest.mock("../js/fetchHomeTimeline", () => jest.fn().mockResolvedValue(""));

describe("HomeTimelineAPIContainer", () => {
    const homeTimelineAPIContainer = shallow(<HomeTimelineAPIContainer />)
    const errorMessage = (<p>{homeTimelineAPIContainer.instance().errorMessage}</p>);
    const loadingMessage = (<p>{homeTimelineAPIContainer.instance().loadingMessage}</p>);

    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders stand in p-tag and triggers requestHandler", () => {
        
        expect(fetchHomeTimeline).toHaveBeenCalled();
        expect(homeTimelineAPIContainer.containsMatchingElement(errorMessage)).toBeTruthy();
        
    });
    
    // it("simulates button click, triggers requestHandler and renders errorMessage", () => {

    //     expect(homeTimelineAPIContainer.containsMatchingElement(errorMessage)).toBeTruthy();

    //     fetchHomeTimeline.mockResolvedValue("");
    //     homeTimelineAPIContainer
    //         .find("button")
    //         .simulate("click", {preventDefault: () => {}});

    //     expect(fetchHomeTimeline).toHaveBeenCalled(); 
    //     expect(homeTimelineAPIContainer.containsMatchingElement(loadingMessage)).toBeTruthy();
        
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
    //         <div className="homeTimelineAPIContainer">
    //             <TweetContainer key={testData.postUrl} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt} user={testData.user} />
    //             <TweetContainer key={testData.postUrl} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt} user={testData.user}/>
    //         </div>
    //     );
        
    //     fetchHomeTimeline.mockResolvedValue([testData, testData]);
    //     homeTimelineAPIContainer
    //         .find("button")
    //         .simulate("click", {preventDefault: () => {}});

    //     expect(homeTimelineAPIContainer.containsMatchingElement(<p>{homeTimelineAPIContainer.instance().loadingMessage}</p>)).toBeTruthy();
    //     expect(fetchHomeTimeline).toHaveBeenCalled();
        
    //     return fetchHomeTimeline("home")
    //         .then((response) => {
    //             homeTimelineAPIContainer.instance().updateStatus(response);
    //             homeTimelineAPIContainer.update();
    //             expect(homeTimelineAPIContainer.childAt(1).getElement()).toMatchObject(expectedDiv);
    //         });
    // });
});