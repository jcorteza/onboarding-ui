import React from "react";
import { shallow } from "enzyme";
import TimelineContainer from "../components/TimelineContainer.jsx";
import TweetContainer from "../components/TweetContainer.jsx";
import fetchTimeline from "../js/fetchTimeline.js";

jest.mock("../js/fetchTimeline", () => jest.fn().mockResolvedValue(""));

describe("timelineContainer", () => {
    const timelineContainer = shallow(<TimelineContainer timelineType="home"/>);
    const errorMessage = (<p>{timelineContainer.instance().errorMessage}</p>);
    const loadingMessage = (<p>{timelineContainer.instance().loadingMessage}</p>);

    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders stand in p-tag and triggers requestHandler", () => {
        
        expect(fetchTimeline).toHaveBeenCalled();
        expect(timelineContainer.containsMatchingElement(errorMessage)).toBeTruthy();
        
    });
    
    it("simulates button click, triggers requestHandler and renders errorMessage", () => {

        expect(timelineContainer.containsMatchingElement(errorMessage)).toBeTruthy();

        fetchTimeline.mockResolvedValue("");
        timelineContainer
            .find("button")
            .simulate("click", {preventDefault: () => {}});

        expect(fetchTimeline).toHaveBeenCalled(); 
        expect(timelineContainer.containsMatchingElement(loadingMessage)).toBeTruthy();
        
    });
    
    it("simulates button click, triggers requestHandler and renders timeline", () => {
        
        let testData = {
            postUrl: "www.twitter.com",
            message: "test message",
            createdAt: Date.now().valueOf(),
            user: {
                name: "Twitter User",
                twHandle: "twUser",
                profileImageUrl: "picture.com"
            }
        };
        let expectedDiv = (
            <div className="timelineContainer">
                <TweetContainer key={testData.postUrl} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt} user={testData.user} />
                <TweetContainer key={testData.postUrl} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt} user={testData.user}/>
            </div>
        );
        
        fetchTimeline.mockResolvedValue([testData, testData]);
        timelineContainer
            .find("button")
            .simulate("click", {preventDefault: () => {}});

        expect(timelineContainer.containsMatchingElement(<p>{timelineContainer.instance().loadingMessage}</p>)).toBeTruthy();
        expect(fetchTimeline).toHaveBeenCalled();
        
        return fetchTimeline("home")
            .then((response) => {
                timelineContainer.instance().updateStatus(response);
                timelineContainer.update();
                expect(timelineContainer.childAt(1).getElement()).toMatchObject(expectedDiv);
            });
    });
});