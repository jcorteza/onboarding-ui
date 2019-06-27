import React from "react";
import { shallow } from "enzyme";
import StatusContainer from "../view/components/StatusContainer";
import getFormattedDate from "../service/utils/getFormattedDate";

jest.mock("../service/utils/getFormattedDate");

describe("<StatusContainer />", () => {
    it("renders with data from props", () => {

        getFormattedDate.mockImplementation(() => "June 13"); 
        const statusContainer = shallow(<StatusContainer postUrl="www.twitter.com" message="test message"/>);
    
        expect(statusContainer.getElement()).toEqual(
            <div className="textDiv">
                <span className="dateSpan">{getFormattedDate()}</span>
                <a className="tweetLink" href="www.twitter.com" target="_blank">
                    <p className="tweetText">test message</p>
                </a>
            </div>
        );

    });
});