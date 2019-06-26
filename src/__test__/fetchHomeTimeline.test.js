import fetchHomeTimeline from "../js/fetchHomeTimeline.js";

describe("fetchHomeTimeline", () => {
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
        return fetchHomeTimeline("home")
            .then((responseData) => {
                expect(responseData).toBe(data);
            });
    
    });
    
    test("fetchHomeTimeline returns undefined or \"\"", () => {
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
        return fetchHomeTimeline("user")
            .catch((error) => {
                expect(error).toEqual(new Error("Something went wrong during the API call. Status: 500"));
            });
    });
});