import fetchUserTimeline from "../js/fetchUserTimeline.js";

describe("fetchUserTimeline", () => {
    test("returns array with data", () => {
        let data = ["test", "array", "data"];
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return new Promise((resolve) => {
                resolve({
                    ok: true,
                    status: 200,
                    json: () => {
                        return data;
                    }
                })
            });
        });
        return fetchUserTimeline()
            .then((responseData) => {
                expect(responseData).toBe(data);
            });
    
    });
    
    test("fetchUserTimeline returns undefined or \"\"", () => {
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return new Promise((resolve) => {
                resolve({
                    ok: true,
                    status: 500,
                    json: () => {
                        return {};
                    }
                })
            });
        });
        return fetchUserTimeline()
            .then((responseData) => {
                expect(responseData).toMatch("");
            });
    
    });
});