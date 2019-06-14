import {shallow} from "enzyme";
import GetTimelineButton from "../components/GetTimelineButton.jsx";

test("", () => {
    const mockSendRequest = jest.fn();
    const button = shallow(<GetTimelineButton onClick={mockSendRequest}/>);

    fireEvent.click(button);
    expect(mockSendRequest).toHaveBeenCalledTimes(1);

    expect(button).toHaveReturn("<button>Get Home Timeline</button>");
});