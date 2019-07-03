import postTweetToTimeline from "../service/postTweetToTimeline";

describe("postTweetToTimeline method", () => {
    test("returns response object with key successful, value true", () => {
        global.Headers = jest.fn(() => ({append: () => null}));
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return new Promise((resolve) => {
                resolve({
                    ok: true
                });
            });

        });

        return postTweetToTimeline("test")
            .then((response) => {
                expect(response).toHaveProperty("successful", true);
                expect(response.successful).toBeTruthy();
            });

    });

    test("returns response object with key successful, value false", () => {
        let response = { successful: false };
        global.Headers = jest.fn(() => ({append: () => null}));
        global.fetch = jest.fn().mockImplementationOnce(() => {

            return new Promise((resolve) => {
                resolve({
                    ok: false
                });
            });

        });

        return postTweetToTimeline("test")
            .then((response) => {
                expect(response).toHaveProperty("successful", false);
                expect(response.successful).toBeFalsy();
            });

    });
});