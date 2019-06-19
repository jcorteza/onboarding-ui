import React from "react";
import { shallow } from "enzyme";
import TimelineContainer from "../components/TimelineContainer.jsx";
import TweetContainer from "../components/TweetContainer.jsx";
import fetchTimeline from "../js/fetchTimeline.js";

jest.mock("../js/fetchTimeline", () => {
    return jest.fn(() => new Promise((resolve) => resolve()));
});

describe("timelineContainer", () => {
    const timelineContainer = shallow(<TimelineContainer />);
    const errorRendering = (<p>{timelineContainer.instance().errorMessage}</p>);
    fetchTimeline.mockImplementation(() => {
        return new Promise((resolve) => resolve());
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders stand in p-tag and triggers requestHandler", () => {
        let testData = [];
        
        fetchTimeline.mockResolvedValue(testData);
        expect(fetchTimeline).toHaveBeenCalled();
        expect(timelineContainer.containsMatchingElement(errorRendering)).toBeTruthy();
        
    });
    
    it("simulates button click, triggers requestHandler and renders errorRendering", () => {
        let testData = [];

        expect(timelineContainer.containsMatchingElement(errorRendering)).toBeTruthy();

        fetchTimeline.mockResolvedValue(testData);
        timelineContainer
            .find("button#apiButton")
            .simulate("click", {preventDefault: () => {}});
        
        expect(timelineContainer.containsMatchingElement(<p>{timelineContainer.instance().fillerMessage}</p>)).toBeTruthy();
        expect(fetchTimeline).toHaveBeenCalled(); 

        return fetchTimeline()
            .then((response) => {
                timelineContainer.instance().updateStatus(response);
                expect(timelineContainer.containsMatchingElement(errorRendering)).toBeTruthy();
            });
        
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
            <div id="timelineContainer">
                <TweetContainer key={testData.postUrl} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt} user={testData.user} />
                <TweetContainer key={testData.postUrl} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt} user={testData.user}/>
            </div>
        );
        
        fetchTimeline.mockResolvedValue([testData, testData]);
        timelineContainer
            .find("button#apiButton")
            .simulate("click", {preventDefault: () => {}});

        expect(timelineContainer.containsMatchingElement(<p>{timelineContainer.instance().fillerMessage}</p>)).toBeTruthy();
        expect(fetchTimeline).toHaveBeenCalled();
        
        return fetchTimeline()
            .then((response) => {
                timelineContainer.instance().updateStatus(response);
                timelineContainer.update();
                expect(timelineContainer.childAt(1).getElement()).toMatchObject(expectedDiv);
            });
    });
});