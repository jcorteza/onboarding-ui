import React from "react";
import { shallow } from "enzyme";
import TimelineContainer from "../components/TimelineContainer.jsx";
import TweetContainer from "../components/TweetContainer.jsx";
import requestHandler from "../js/requestHandler.js";

jest.mock("../js/requestHandler.js");

describe("timelineContainer updates based on state", () => {
    const timelineContainer = shallow(<TimelineContainer />);
    const errorRendering = (<p>{timelineContainer.instance().errorMessage}</p>);

    test("timeline container renders stand in p-tag and triggers requestHandler", () => {
        
        requestHandler.mockImplementation(() => {
            timelineContainer.instance().updateStatus("");
        });
    
        expect(timelineContainer.containsMatchingElement(<p>{timelineContainer.instance().fillerMessage}</p>)).toBeTruthy();
        expect(requestHandler).toHaveBeenCalledWith(timelineContainer.instance().updateStatus); 
        requestHandler(timelineContainer.instance().updateStatus(""));
        expect(timelineContainer.containsMatchingElement(errorRendering)).toBeTruthy();
        
    });
    
    test("button click triggers requestHandler and renders errorRendering", () => {

        timelineContainer
            .find("button#apiButton")
            .simulate("click", {preventDefault: () => {}});
        expect(requestHandler).toHaveBeenCalledWith(timelineContainer.instance().updateStatus); 
        expect(timelineContainer.containsMatchingElement(errorRendering)).toBeTruthy();
        
    });

    test("button click triggers requestHandler and renders timeline", () => {

        let testData = {
            postUrl: "www.twitter.com",
            message: "test message",
            createdAt: Date.now().valueOf()
        };
        let expectedDiv = (
            <div id="timelineContainer">
                <TweetContainer key={testData.postUrl} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt}/>
                <TweetContainer key={testData.postUrl} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt}/>
            </div>
        );

        requestHandler.mockImplementation(() => {
            timelineContainer.instance().updateStatus(JSON.stringify([testData, testData]));
        });
        timelineContainer
            .find("button#apiButton")
            .simulate("click", {preventDefault: () => {}});
        expect(requestHandler).toHaveBeenCalledWith(timelineContainer.instance().updateStatus); 
        expect(timelineContainer.childAt(1).equals(expectedDiv)).toBeTruthy();
    });
});