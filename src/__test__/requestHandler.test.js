import requestHandler from "../js/requestHandler.js";

test("requestHandler runs callback at end of call", (done) => {
    expect.hasAssertions();
    let testCallback = (data) => {
        expect(data).toBeFalsy();
        done();
    };
    requestHandler(testCallback);
});