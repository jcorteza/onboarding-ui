import requestHandler from "../js/requestHandler.js";

test("requestHandler runs callback at end of call", (done) => {
    let testCallback = (data) => {
        expect(data).toBe(expect.any(JSON) || expect.toMatch(""))
        expect(testCallback).toHaveBeenCalled();
        done();
    };
    requestHandler(testCallback);
});