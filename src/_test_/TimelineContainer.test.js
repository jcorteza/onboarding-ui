import {shallow} from "enzyme";
import TimelineContainer from "../components/TimelineContainer.jsx";
import { JestEnvironment } from "@jest/environment";

test("", () => {
    jest.mock(new XMLHttpRequest());
    const testRequest = new XMLHttpRequest();
    const timelineContainer = shallow(<TimelineContainer error="false" finished="false" response="[]"/>);

    component
        .find("button")
        .simulate("click");

    expect(fn).toHaveBeenCalled(); 
    expect(timelineContainer).toHaveReturn("<div className=\"timelineContainer\"></div>");
});