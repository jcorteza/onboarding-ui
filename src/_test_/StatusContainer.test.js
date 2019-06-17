import {shallow} from "enzyme";
import StatusContainer from "../components/StatusContainer.jsx";

test("statusContainer renders with data from props", () => {
    const mockGetFormattedDate = jest.fn(() => "June 13"); 
    const statusContainer = shallow(<StatusContainer postUrl="http://www.weblink.com" message="test message"/>);

    expect(StatusContainer).toHaveBeenCalled();
    expect(statusContainer.render).toHaveReturnedWith(
        <div className="textDiv">
            <p>{mockGetFormattedDate()}</p>
            <a href="http://www.weblink.com" target="_blank">
                <p>test message</p>
            </a>
        </div>
    );
});