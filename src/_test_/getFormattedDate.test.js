import getFormattedDate from "../src/js/getFormattedDate.js";

test("returns date as string", () => {
    let testDate = new Date();

    testDate.setDate(13);
    testDate.setMonth(5);
    expect(getFormattedDate(testDate)).toHaveReturnedWith(expect.toMatch(/June 13/));
});