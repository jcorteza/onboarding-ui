import {shallow} from "enzyme";
import GetTimelineButton from "../components/GetTimelineButton.jsx";

test("", () => {
    const button = shallow(<GetTimelineButton />);

    expect(button).toHaveReturn("<button>Get Home Timeline</button>");
});