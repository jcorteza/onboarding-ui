import React from "react";
import { shallow } from "enzyme";
import UserTimelineUIContainer from "../components/UserTimelineUIContainer";
import TimelineContainer from "../components/TimelineContainer";
import fetchUserTimeline from "../js/fetchUserTimeline";

jest.mock("../js/fetchUserTimeline", () => jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => reject(new Error("test error")));
}));

describe("UserTimelineUIContainer", () => {
    const userUIContainer = shallow(<UserTimelineUIContainer timelineType="home"/>);
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
        expect(userUIContainer.hasClass("uiContainer")).toBeTruthy();
        expect(userUIContainer.type()).toMatch("div");
        expect(userUIContainer.containsMatchingElement(<h2>User Timeline</h2>)).toBeTruthy();
        expect(userUIContainer.childAt(1).type()).toMatch("button");
        expect(userUIContainer.childAt(2).type()).toEqual(TimelineContainer);
        
    });

    it("simulates button click, triggers requestHandler and renders errorMessage", () => {

        expect(userUIContainer.html()).toEqual(expect.stringContaining(errorMessage));

        fetchUserTimeline.mockImplementation(() => {
            return new Promise((resolve, reject) => reject(new Error("test error")));
        });
        userUIContainer
            .find("button")
            .simulate("click", {preventDefault: () => {}});

        expect(fetchUserTimeline).toHaveBeenCalled(); 
        expect(userUIContainer.html()).toEqual(expect.stringContaining(loadingMessage));
        
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
        let expectedTimeline = <TimelineContainer data={[testData]} fetchComplete={true} errorOccurred={false} fillerMessage={userUIContainer.instance().fillerMessage}/>;
        
        fetchUserTimeline.mockImplementation(() => {
            return new Promise((resolve, reject) => resolve([testData]));
        });
        userUIContainer
            .find("button")
            .simulate("click", {preventDefault: () => {}});

        expect(userUIContainer.html()).toEqual(expect.stringContaining(loadingMessage));
        expect(fetchUserTimeline).toHaveBeenCalled();
        
        return fetchUserTimeline("home")
            .then((response) => {
                userUIContainer.setState({data: response, fetchComplete: true, errorOccurred: false});
                userUIContainer.update();
                expect(userUIContainer.containsMatchingElement(<h2>User Timeline</h2>)).toBeTruthy();
                expect(userUIContainer.containsMatchingElement(<button className="uiButton" type="button">View User Timeline</button>)).toBeTruthy();
                expect(userUIContainer.contains(expectedTimeline)).toBeTruthy();
            });
    });
    
});