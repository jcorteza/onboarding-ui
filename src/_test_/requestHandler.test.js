import requestHandler from "../src/js/requestHandler.js";

test("requestHandler runs callback at end of call", (done) => {
    let testRequestHandler = jest.mock(requestHandler);
    let testCallback = (status, data) => {
        expect(status).toBe(expect.any(Number));
        expect(JSON.parse(data)).toBe(expect.any(Array) || expect.toBeUndefined())
        expect(testCallback).toHaveBeenCalled();
        done();
    };
    testRequestHandler(testCallback);
});