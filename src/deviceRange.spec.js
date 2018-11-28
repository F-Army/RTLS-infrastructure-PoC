const locator = require("./locate");
locator.locate = jest.fn();
const { addRange, getRanges } = require("./devicesRange");

describe("Device range structure tests", () => {

    beforeEach(() => {
        getRanges().clear();
    });

    it("should add new devices correctly", () => {
        const newRange = {
            anchor: 0x1,
            tag: 0x5,
            range: 20.2,
        };
        expect(getRanges().size).toBe(0);
        addRange(newRange);
        expect(getRanges().size).toBe(1);
        expect(getRanges().get(newRange.tag)).toMatchObject([{anchor: newRange.anchor, range: newRange.range}]);
    });

    it("should not store more than 1 range from the same anchor on the same tag", () => {
        const newRange = {
            anchor: 0x1,
            tag: 0x5,
            range: 20.2,
        };

        addRange(newRange);
        addRange(newRange);

        expect(getRanges().get(newRange.tag).length).toBe(1);
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

        expect(getRanges().get(newRange.tag)).toMatchObject([{
            anchor: 0x1,
            range: 18,
        }]);
    });

    it("should locate after 3 valid ranges", () => {
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
        
        expect(locator.locate).toHaveBeenCalledTimes(1);
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

        expect(getRanges().has(rangeA.tag)).toBe(false);
    });
});