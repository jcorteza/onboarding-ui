import React from "react";
import { shallow } from "enzyme";
import TimelineContainer from "../components/TimelineContainer.jsx";
import requestHandler from "../js/requestHandler.js";

jest.mock("../js/requestHandler.js");

describe("timelineContainer updates based on state", () => {
    const timelineContainer = shallow(<TimelineContainer />);
    const errorRendering = (<p>This content is not currently available. Please try again later.</p>);

    test("timeline container renders stand in p-tag and triggers requestHandler", () => {
        
        requestHandler.mockImplementation(() => {
            timelineContainer.instance().updateStatus("");
        });
    
        expect(timelineContainer.contains(<p>Loading your Twitter timeline...</p>)).toBeTruthy();
        expect(requestHandler).toHaveBeenCalledWith(timelineContainer.instance().updateStatus); 
        requestHandler(timelineContainer.instance().updateStatus(""));
        expect(timelineContainer.contains(errorRendering)).toBeTruthy();
        
    });
    
    test("button click triggers requestHandler and renders errorRendering", () => {

        timelineContainer
            .find("button#apiButton")
            .simulate("click", {preventDefault: () => {}});
        expect(requestHandler).toHaveBeenCalledWith(timelineContainer.instance().updateStatus); 
        expect(timelineContainer.contains(errorRendering)).toBeTruthy();
        
    });
});