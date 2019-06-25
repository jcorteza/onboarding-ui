import fetchFilteredHomeTimeline from "../js/fetchFilteredHomeTimeline.js";

describe("fetchFilteredHomeTimeline", () => {
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
        return fetchFilteredHomeTimeline("keyword")
            .then((responseData) => {
                expect(responseData).toBe(data);
            });
    
    });
    
    test("fetchFilteredHomeTimeline returns an empty array", () => {
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
        return fetchFilteredHomeTimeline("keyword")
            .then((responseData) => {
                expect(responseData).toMatchObject([]);
            });
    
    });
});