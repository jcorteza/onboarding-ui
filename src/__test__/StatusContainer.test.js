import React from "react";
import { shallow } from "enzyme";
import StatusContainer from "../components/StatusContainer";
import getFormattedDate from "../js/getFormattedDate";

jest.mock("../js/getFormattedDate");

describe("<StatusContainer />", () => {
    test("renders with data from props", () => {

        getFormattedDate.mockImplementation(() => "June 13"); 
        const statusContainer = shallow(<StatusContainer postUrl="http://www.weblink.com" message="test message"/>);
    
        expect(statusContainer.getElement()).toEqual(
            <div className="textDiv">
                <p>{getFormattedDate()}</p>
                <a href="http://www.weblink.com" target="_blank">
                    <p>test message</p>
                </a>
            </div>
        );

    });
});