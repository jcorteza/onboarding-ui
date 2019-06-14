import {shallow} from "enzyme";
import StatusContainer from "../components/StatusContainer.jsx";

test("", () => {
    const mockGetFormattedDate = jest.fn(() => "June 13"); 
    const statusContainer = shallow(<StatusContainer date={new Date()} postUrl="http://www.weblink.com" message="test message"/>);

    expect(statusContainer).toHaveReturn("<div className=\"textDiv\"></div>");
});