import fetchTimeline from "../js/fetchTimeline.js";

describe("fetchTimeline", () => {
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
        return fetchTimeline()
            .then((responseData) => {
                expect(responseData).toBe(data);
            });
    
    });
    
    test("fetchTimeline returns an empty array", () => {
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
        return fetchTimeline()
            .then((responseData) => {
                expect(responseData).toMatchObject([]);
            });
    
    });
});