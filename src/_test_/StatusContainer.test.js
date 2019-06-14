import {shallow} from "enzyme";
import StatusContainer from "../components/StatusContainer.jsx";

test("", () => {
    const statusContainer = shallow(<StatusContainer />);

    expect(statusContainer).toHaveReturn("<div className=\"textDiv\"></div>");
});