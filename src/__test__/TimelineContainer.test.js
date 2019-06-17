import React from "react";
import {shallow} from "enzyme";
import TimelineContainer from "../components/TimelineContainer.jsx";
import requestHandler from "../js/requestHandler.js";

jest.mock("../js/requestHandler.js");

test("timelineContainer updates based on state", () => {
    const timelineContainer = shallow(<TimelineContainer />);
    const errorRendering = (
        <div id="apiContainer">
            <button id="apiButton" type="button" onClick={timelineContainer.handleClick}>Get Home Timeline</button>
            <div className="timelineContainer">
                <p>This content is not currently available. Please try again later.</p>
            </div>
        </div>
    );
    
    requestHandler.mockImplementation((callback) => {
        callback("");
    });

    expect(TimelineContainer).toHaveBeenCalled();
    expect(timelineContainer.render).toHaveReturnedWith(
        <div id="apiContainer">
            <button id="apiButton" type="button" onClick={timelineContainer.handleClick}>Get Home Timeline</button>
            <div className="timelineContainer">
                <p>Loading your Twitter timeline...</p>
            </div>
        </div>
    );
    expect(timelineContainer.componentDidMount).toHaveBeenCalled();
    expect(requestHandler).toHaveBeenCalledWith(timelineContainer.updateStatus); 
    expect(timelineContainer.updateStatus).toHaveBeenCalledWith("");
    expect(timelineContainer.setState).toHaveBeenCalledWith({
        data: [],
        errorOccurred: true
    });
    expect(timelineContainer.render).toHaveReturnedWith(errorRendering);
    
    timelineContainer
        .find("button#apiButton")
        .simulate("click");
    expect(timelineContainer.handleClick).toHaveBeenCalled();
    expect(timelineContainer.setState).toHaveBeenCalled();
    expect(requestHandler).toHaveBeenCalledWith(timelineContainer.updateStatus); 
    expect(timelineContainer.updateStatus).toHaveBeenCalledWith("");
    expect(timelineContainer.render).toHaveReturnedWith(errorRendering);
    
});