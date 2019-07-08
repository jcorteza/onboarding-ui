import React from "react";
import { shallow } from "enzyme";
import PostTweetUI from "../view/components/PostTweetUI";
import postTweetToTimeline from "../service/postTweetToTimeline";

jest.mock(
    "../service/postTweetToTimeline",
    () => jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => reject(new Error("test error")));
    })
);

describe("PostTweetUI component", () => {
    const testUI = shallow(<PostTweetUI />);

    test("renders expected elements", () => {

        expect(testUI.type()).toMatch("div");
        expect(testUI.childAt(0).type()).toMatch("textarea");
        expect(testUI.childAt(1).type()).toMatch("span");
        expect(testUI.childAt(2).type()).toMatch("div");
    });

});