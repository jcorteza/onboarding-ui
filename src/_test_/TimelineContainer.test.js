import {shallow} from "enzyme";
import TimelineContainer from "../components/TimelineContainer.jsx";

test("timelineContainer updates based on state", () => {
    const timelineContainer = shallow(<TimelineContainer error="false" finished="false" response="[]"/>);

    component
        .find("button")
        .simulate("click");

    expect(fn).toHaveBeenCalled(); 
    expect(timelineContainer).toHaveReturn("<div className=\"timelineContainer\"></div>");
});