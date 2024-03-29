import React from "react";
import { shallow } from "enzyme";
import UserTimelineUIContainer from "../view/components/UserTimelineUIContainer";
import TimelineContainer from "../view/components/TimelineContainer";
import fetchUserTimeline from "../service/fetchUserTimeline";

jest.mock("../service/fetchUserTimeline", () => jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => reject(new Error("test error")));
}));

describe("UserTimelineUIContainer", () => {
    const userUIContainer = shallow(<UserTimelineUIContainer timelineType="home"/>);
    const errorMessage = `<p class="infoText">${TimelineContainer.prototype.errorMessage}</p>`;
    const loadingMessage = `<p class="infoText">${TimelineContainer.prototype.loadingMessage}</p>`;

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
        expect(userUIContainer.childAt(0).type()).toMatch("button");
        expect(userUIContainer.childAt(1).type()).toEqual(TimelineContainer);
        
    });

    it("simulates button click, triggers requestHandler and renders errorMessage", () => {

        expect(userUIContainer.html()).toEqual(expect.stringContaining(errorMessage));

        fetchUserTimeline.mockImplementation(() => {
            return new Promise((resolve, reject) => reject(new Error("test error")));
        });
        userUIContainer
            .find("button")
            .first()
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
            .first()
            .simulate("click", {preventDefault: () => {}});

        expect(userUIContainer.html()).toEqual(expect.stringContaining(loadingMessage));
        expect(fetchUserTimeline).toHaveBeenCalled();
        
        return fetchUserTimeline("home")
            .then((response) => {
                userUIContainer.setState({data: response, fetchComplete: true, errorOccurred: false});
                userUIContainer.update();
                expect(userUIContainer.containsMatchingElement(<button className="uiButton" type="button">View User Timeline</button>)).toBeTruthy();
                expect(userUIContainer.contains(expectedTimeline)).toBeTruthy();
            });
    });
    
});