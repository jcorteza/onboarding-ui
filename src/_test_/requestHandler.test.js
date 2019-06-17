import requestHandler from "../src/js/requestHandler.js";

test("requestHandler runs callback at end of call", (done) => {
    let testCallback = (data) => {
        expect(JSON.parse(data)).toBe(expect.any(Array) || expect.toMatch(""))
        expect(testCallback).toHaveBeenCalled();
        done();
    };
    requestHandler(testCallback);
});