import React from "react";
import { shallow } from "enzyme";
import HomeTimelineAPIContainer from "../components/HomeTimelineAPIContainer";
import TimelineContainer from "../components/TimelineContainer";
import fetchHomeTimeline from "../js/fetchHomeTimeline";

jest.mock("../js/fetchHomeTimeline", () => jest.fn().mockResolvedValue(""));

describe("HomeTimelineAPIContainer", () => {
    const homeTimelineAPIContainer = shallow(<HomeTimelineAPIContainer />)
    const errorMessage = `<p>${TimelineContainer.prototype.errorMessage}</p>`;
    const loadingMessage = `<p>${TimelineContainer.prototype.loadingMessage}</p>`;

    beforeEach(() => {
        jest.resetModules();
    });
    
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders expected types", () => {
        
        expect(fetchHomeTimeline).toHaveBeenCalled();
        expect(homeTimelineAPIContainer.hasClass("apiContainer")).toBeTruthy();
        expect(homeTimelineAPIContainer.type()).toMatch("div");
        expect(homeTimelineAPIContainer.containsMatchingElement(<h2>Home Timeline</h2>)).toBeTruthy();
        expect(homeTimelineAPIContainer.childAt(1).type()).toMatch("button");
        expect(homeTimelineAPIContainer.childAt(2).type()).toEqual(TimelineContainer);
    });
    
    it("simulates button click, triggers requestHandler and renders errorMessage", () => {

        expect(homeTimelineAPIContainer.html()).toEqual(expect.stringContaining(errorMessage));

        fetchHomeTimeline.mockResolvedValue("");
        homeTimelineAPIContainer
            .find("button")
            .simulate("click", {preventDefault: () => {}});

        expect(fetchHomeTimeline).toHaveBeenCalled(); 
        expect(homeTimelineAPIContainer.html()).toEqual(expect.stringContaining(loadingMessage));
        
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
        let expectedTimeline = <TimelineContainer data={[testData]} fetchComplete={true} errorOccurred={false} fillerMessage={homeTimelineAPIContainer.instance().fillerMessage}/>;
        
        fetchHomeTimeline.mockResolvedValue([testData]);
        homeTimelineAPIContainer
            .find("button")
            .simulate("click", {preventDefault: () => {}});

        expect(homeTimelineAPIContainer.html()).toEqual(expect.stringContaining(loadingMessage));
        expect(fetchHomeTimeline).toHaveBeenCalled();
        
        return fetchHomeTimeline("home")
            .then((response) => {
                homeTimelineAPIContainer.instance().updateStatus(response);
                homeTimelineAPIContainer.update();
                expect(homeTimelineAPIContainer.containsMatchingElement(<h2>Home Timeline</h2>)).toBeTruthy();
                expect(homeTimelineAPIContainer.containsMatchingElement(<button className="apiButton" type="button">View Twitter Timeline</button>)).toBeTruthy();
                expect(homeTimelineAPIContainer.contains(expectedTimeline)).toBeTruthy();
            });
    });
});