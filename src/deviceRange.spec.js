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

    it("should store the latest range if it receives a duplicate from the same anchor on the same tag", () => {
        const newRange = {
            anchor: 0x1,
            tag: 0x5,
            range: 20.2,
        };

        const newnewRange = { ...newRange, range: 18 };

        addRange(newRange);
        addRange(newnewRange);

        expect(getRanges()[newnewRange.tag.toString()].ranges).toMatchObject([{
            anchor: 0x1,
            range: 18,
        }]);
    });

    it("should empty target tag after 3 ranges from 3 different anchors", () => {
        const rangeA = {
            anchor: 0x1,
            tag: 0x5,
            range: 20.2,
        };

        const rangeB = {
            ...rangeA,
            anchor: 0x02
        };

        const rangeC = {
            ...rangeA,
            anchor: 0x03
        };

        addRange(rangeA);
        addRange(rangeB);
        addRange(rangeC);

        expect(getRanges()[rangeA.tag.toString()].ranges.length).toBe(0);
    });
});