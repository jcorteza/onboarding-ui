import React from "react";
import { shallow } from "enzyme";
import UserTimelineAPIContainer from "../components/UserTimelineAPIContainer";
import TimelineContainer from "../components/TimelineContainer";
import fetchUserTimeline from "../js/fetchUserTimeline";

jest.mock("../js/fetchUserTimeline", () => jest.fn().mockResolvedValue(""));

describe("UserTimelineAPIContainer", () => {
    const userAPIContainer = shallow(<UserTimelineAPIContainer timelineType="home"/>);
    const errorMessage = `<p>${TimelineContainer.prototype.errorMessage}</p>`;
    const loadingMessage = `<p>${TimelineContainer.prototype.loadingMessage}</p>`;

    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders expected types", () => {
        
        expect(fetchUserTimeline).toHaveBeenCalled();
        expect(userAPIContainer.hasClass("apiContainer")).toBeTruthy();
        expect(userAPIContainer.type()).toMatch("div");
        expect(userAPIContainer.containsMatchingElement(<h2>User Timeline</h2>)).toBeTruthy();
        expect(userAPIContainer.childAt(1).type()).toMatch("button");
        expect(userAPIContainer.childAt(2).type()).toEqual(TimelineContainer);
        
    });

    it("simulates button click, triggers requestHandler and renders errorMessage", () => {

        expect(userAPIContainer.html()).toEqual(expect.stringContaining(errorMessage));

        fetchUserTimeline.mockResolvedValue(new Error("test error"));
        userAPIContainer
            .find("button")
            .simulate("click", {preventDefault: () => {}});

        expect(fetchUserTimeline).toHaveBeenCalled(); 
        expect(userAPIContainer.html()).toEqual(expect.stringContaining(loadingMessage));
        
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
        let expectedTimeline = <TimelineContainer data={[testData]} fetchComplete={true} errorOccurred={false} fillerMessage={userAPIContainer.instance().fillerMessage}/>;
        
        fetchUserTimeline.mockResolvedValue([testData]);
        userAPIContainer
            .find("button")
            .simulate("click", {preventDefault: () => {}});

        expect(userAPIContainer.html()).toEqual(expect.stringContaining(loadingMessage));
        expect(fetchUserTimeline).toHaveBeenCalled();
        
        return fetchUserTimeline("home")
            .then((response) => {
                userAPIContainer.setState({data: response, fetchComplete: true, errorOccurred: false});
                userAPIContainer.update();
                expect(userAPIContainer.containsMatchingElement(<h2>User Timeline</h2>)).toBeTruthy();
                expect(userAPIContainer.containsMatchingElement(<button className="apiButton" type="button">View User Timeline</button>)).toBeTruthy();
                expect(userAPIContainer.contains(expectedTimeline)).toBeTruthy();
            });
    });
    
});