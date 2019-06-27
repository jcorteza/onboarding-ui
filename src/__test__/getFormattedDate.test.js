import getFormattedDate from "../service/utils/getFormattedDate.js";

test("returns date as string", () => {
    let testDate = new Date();

    testDate.setDate(13);
    testDate.setMonth(5);
    expect(getFormattedDate(testDate)).toMatch("June 13");
});