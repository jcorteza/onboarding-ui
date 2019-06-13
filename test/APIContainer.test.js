import {shallow} from "enzyme";
import APIContainer from "../components/APIContainer.jsx";

test("apiContainer returns button and div", () => {
    const apiContainer = shallow(<APIContainer />);

    expect(apiContainer).toHaveReturn("<div id=\"apiContainer\"></div>");
});