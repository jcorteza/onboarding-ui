import {shallow} from "enzyme";
import UserContainer from "../components/UserContainer.jsx";

test("", () => {
    const userContainer = shallow(<UserContainer />);

    expect(userContainer).toHaveReturn("<div className=\"userDiv\"></div>");
});