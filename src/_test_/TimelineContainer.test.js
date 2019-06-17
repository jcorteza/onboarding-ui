import {shallow} from "enzyme";
import TimelineContainer from "../components/TimelineContainer.jsx";
import handleRequest from "../js/handleRequest.js";

jest.mock("../js/handleRequest.js");

test("timelineContainer updates based on state", () => {
    const timelineContainer = shallow(<TimelineContainer />);
    const errorRendering = (
        <div id="apiContainer">
            <button onClick={timelineContainer.}>Get Home Timeline</button>
            <div className="timelineContainer">
                <p>Content Not Available at this Time</p>
            </div>
        </div>
    );
    
    handleRequest.mockImplementation((callback) => {
        callback("");
    });

    expect(timelineContainer.render).toHaveReturnedWith(
        <div id="apiContainer">
            <button onClick={timelineContainer.}>Get Home Timeline</button>
            <div className="timelineContainer">
                <p>Loading Twitter Timeline...</p>
            </div>
        </div>
    );
    expect(timelineContainer.componentDidRender).toHaveBeenCalled();
    expect(handleRequest).toHaveBeenCalled(); 
    expect(timelineContainer.handleClick).toHaveBeenCalledWith("");
    expect(timelineContainer.setState).toHaveBeenCalledWith({
        data: [],
        errorOccurred: true
    });
    expect(timelineContainer.render).toHaveReturnedWith(errorRendering);
    
    
    timelineContainer
        .find("button")
        .simulate("click");
    expect(handleRequest).toHaveBeenCalled(); 
    expect(timelineContainer.handleClick).toHaveBeenCalled();
    expect(timelineContainer.render).toHaveReturnedWith(errorRendering);
    
});