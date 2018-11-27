const { addRange, getRanges, clearAll } = require("./devicesRange");

describe("Device range structure tests", () => {

    beforeEach(() => {
        clearAll();
    });

    it("should add new devices correctly", () => {
        const newRange = {
            anchor: 0x1,
            tag: 0x5,
            range: 20.2,
        };
        expect(getRanges()[newRange.tag.toString()]).toBeUndefined();
        addRange(newRange);
        expect(getRanges()[newRange.tag.toString()].ranges[0]).toMatchObject({anchor: newRange.anchor, range: newRange.range});
    });

    it("should not store more than 1 range from the same anchor on the same tag", () => {
        const newRange = {
            anchor: 0x1,
            tag: 0x5,
            range: 20.2,
        };

        addRange(newRange);
        addRange(newRange);

        expect(getRanges()[newRange.tag.toString()].ranges.length).toBe(1);
    });
});