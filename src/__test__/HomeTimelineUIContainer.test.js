import React from "react";
import { shallow } from "enzyme";
import HomeTimelineUIContainer from "../components/HomeTimelineUIContainer";
import TimelineContainer from "../components/TimelineContainer";
import fetchHomeTimeline from "../js/fetchHomeTimeline";

jest.mock("../js/fetchHomeTimeline", () => jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => reject(new Error("test error")));
}));

describe("HomeTimelineUIContainer", () => {
    const homeTimelineUIContainer = shallow(<HomeTimelineUIContainer />)
    const errorMessage = `<p class="infoText">${TimelineContainer.prototype.errorMessage}</p>`;
    const loadingMessage = `<p class="infoText">${TimelineContainer.prototype.loadingMessage}</p>`;

    beforeEach(() => {
        jest.resetModules();
    });
    
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders expected types", () => {
        
        expect(fetchHomeTimeline).toHaveBeenCalled();
        expect(homeTimelineUIContainer.hasClass("uiContainer")).toBeTruthy();
        expect(homeTimelineUIContainer.type()).toMatch("div");
        expect(homeTimelineUIContainer.containsMatchingElement(<h2>Home Timeline</h2>)).toBeTruthy();
        expect(homeTimelineUIContainer.childAt(1).type()).toMatch("button");
        expect(homeTimelineUIContainer.childAt(2).type()).toEqual(TimelineContainer);
    });
    
    it("simulates button click, triggers requestHandler and renders errorMessage", () => {

        expect(homeTimelineUIContainer.html()).toEqual(expect.stringContaining(errorMessage));

        fetchHomeTimeline.mockImplementation(() => {
            return new Promise((resolve, reject) => reject(new Error("test error")));
        });
        homeTimelineUIContainer
            .find("button")
            .simulate("click", {preventDefault: () => {}});

        expect(fetchHomeTimeline).toHaveBeenCalled(); 
        expect(homeTimelineUIContainer.html()).toEqual(expect.stringContaining(loadingMessage));
        
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
        let expectedTimeline = <TimelineContainer data={[testData]} fetchComplete={true} errorOccurred={false} fillerMessage={homeTimelineUIContainer.instance().fillerMessage}/>;
        
        fetchHomeTimeline.mockImplementation(() => {
            return new Promise((resolve, reject) => resolve([testData]));
        });
        homeTimelineUIContainer
            .find("button")
            .simulate("click", {preventDefault: () => {}});

        expect(homeTimelineUIContainer.html()).toEqual(expect.stringContaining(loadingMessage));
        expect(fetchHomeTimeline).toHaveBeenCalled();
        
        return fetchHomeTimeline("home")
            .then((response) => {
                homeTimelineUIContainer.setState({data: response, fetchComplete: true, errorOccurred: false});
                homeTimelineUIContainer.update();
                expect(homeTimelineUIContainer.containsMatchingElement(<h2>Home Timeline</h2>)).toBeTruthy();
                expect(homeTimelineUIContainer.containsMatchingElement(<button className="uiButton" type="button">View Twitter Timeline</button>)).toBeTruthy();
                expect(homeTimelineUIContainer.contains(expectedTimeline)).toBeTruthy();
            });
    });
});