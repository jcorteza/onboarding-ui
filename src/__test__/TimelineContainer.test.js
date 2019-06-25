import React from "react";
import { shallow } from "enzyme";
import TimelineContainer from "../components/TimelineContainer";
import HomeTimlineAPIContainer from "../components/HomeTimelineAPIContainer";
import TweetContainer from "../components/TweetContainer";

describe("TimelineContainer", () => {
    const errorMessage = <p>{TimelineContainer.prototype.errorMessage}</p>;
    const loadingMessage = <p>{TimelineContainer.prototype.loadingMessage}</p>;
    let testTimelineContainer = shallow(<TimelineContainer data={[]} fetchComplete={false} errorOccurred={false} fillerMessage={HomeTimlineAPIContainer.prototype.fillerMessage}/>);
    let testRendering = <div className="timelineContainer">{loadingMessage}</div>

    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders loading message p-tag", () => {
        
        expect(testTimelineContainer.contains(testRendering)).toBeTruthy();
        
    });

    it("renders error message p-tag", () => {
        testTimelineContainer = shallow(<TimelineContainer data={[]} fetchComplete={true} errorOccurred={true} fillerMessage={HomeTimlineAPIContainer.prototype.fillerMessage}/>);
        testRendering = <div className="timelineContainer">{errorMessage}</div>;

        expect(testTimelineContainer.contains(testRendering)).toBeTruthy();

    });

    it("renders filler message p-tag", () => {
        testTimelineContainer = shallow(<TimelineContainer data={[]} fetchComplete={true} errorOccurred={false} fillerMessage={HomeTimlineAPIContainer.prototype.fillerMessage}/>);
        testRendering = <div className="timelineContainer"><p>{testTimelineContainer.instance().props.fillerMessage}</p></div>;

        expect(testTimelineContainer.contains(testRendering)).toBeTruthy();
        
    });

    it("renders filler message p-tag", () => {
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
        testTimelineContainer = shallow(<TimelineContainer data={[testData]} fetchComplete={true} errorOccurred={false} fillerMessage={HomeTimlineAPIContainer.prototype.fillerMessage}/>);
        testRendering = (
            <div className="timelineContainer">
                <TweetContainer key={testData.postUrl} user={testData.user} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt}/>
            </div>
        );

        expect(testTimelineContainer.contains(testRendering)).toBeTruthy();
        
    });

});