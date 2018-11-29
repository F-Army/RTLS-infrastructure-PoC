const { getAnchors, addAnchor } = require("./anchors");

describe("test", () => {
    beforeEach(() => {
        getAnchors().clear();
    });
    
    it("should update anchor eui when receving a different eui for the same short address", async () => {
        const oldEui = 0x00000000DECADECA;
        const short = 0x01;
        const newEui = 0x00000000DECADE00;
        const anchor = {
            eui: oldEui,
            short,
            x: -0.1,
            y: 0.1,
            z: 0.1,
        };

        const anchorUpdated = { ...anchor, eui: newEui };
        addAnchor(anchor);
        addAnchor(anchorUpdated);
        expect(getAnchors().get(short).eui).toBe(newEui);
    });
});