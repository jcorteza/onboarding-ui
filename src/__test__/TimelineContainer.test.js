import React from "react";
import { shallow } from "enzyme";
import TimelineContainer from "../components/TimelineContainer";
import HomeTimlineUIContainer from "../components/HomeTimelineUIContainer";
import TweetContainer from "../components/TweetContainer";

describe("TimelineContainer", () => {
    const errorMessage = <p className="infoText">{TimelineContainer.prototype.errorMessage}</p>;
    const loadingMessage = <p className="infoText">{TimelineContainer.prototype.loadingMessage}</p>;
    let testTimelineContainer = shallow(<TimelineContainer data={[]} fetchComplete={false} errorOccurred={false} fillerMessage={HomeTimlineUIContainer.prototype.fillerMessage}/>);
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
        testTimelineContainer = shallow(<TimelineContainer data={[]} fetchComplete={true} errorOccurred={true} fillerMessage={HomeTimlineUIContainer.prototype.fillerMessage}/>);
        testRendering = <div className="timelineContainer">{errorMessage}</div>;

        expect(testTimelineContainer.contains(testRendering)).toBeTruthy();

    });

    it("renders filler message p-tag", () => {
        testTimelineContainer = shallow(<TimelineContainer data={[]} fetchComplete={true} errorOccurred={false} fillerMessage={HomeTimlineUIContainer.prototype.fillerMessage}/>);
        testRendering = <div className="timelineContainer"><p className="infoText">{testTimelineContainer.instance().props.fillerMessage}</p></div>;

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
        testTimelineContainer = shallow(<TimelineContainer data={[testData]} fetchComplete={true} errorOccurred={false} fillerMessage={HomeTimlineUIContainer.prototype.fillerMessage}/>);
        testRendering = (
            <div className="timelineContainer">
                <TweetContainer key={testData.postUrl} user={testData.user} postUrl={testData.postUrl} message={testData.message} createdAt={testData.createdAt}/>
            </div>
        );

        expect(testTimelineContainer.contains(testRendering)).toBeTruthy();
        
    });

});