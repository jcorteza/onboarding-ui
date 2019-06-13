import {shallow} from "enzyme";
import TweetContainer from "../components/TweetContainer.jsx";

test("", () => {
    const tweetContainer = shallow(<TweetContainer />);

    expect(tweetContainer).toHaveReturn("<div className=\"tweetContainer\"></div>");
});