import fetchUserTimeline from "../service/fetchUserTimeline.js";

describe("fetchUserTimeline", () => {
    it("returns a Promise that resolves with data", () => {
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
    
    it("returns a Promise that rejects with an Error", () => {
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
            .catch((error) => {
                expect(error).toEqual(new Error("Something went wrong during the API call. Status: 500"));
            });
    
    });
});