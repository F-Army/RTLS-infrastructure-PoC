const { getAnchors, addAnchor } = require("./anchors");

const templateAnchor = {
    eui: 0x00000000DECADECA,
    short: 0x01,
    x: -0.1,
    y: 0.1,
    z: 0.1,
};

describe("test", () => {
    beforeEach(() => {
        getAnchors().clear();
    });

    it("should update anchor eui when receving a different eui for the same short address", async () => {
        const newEui = 0x00000000DECADE00;

        const anchorUpdated = { ...templateAnchor, eui: newEui };
        addAnchor(templateAnchor);
        addAnchor(anchorUpdated);
        expect(getAnchors().get(templateAnchor.short).eui).toBe(newEui);
    });

    it("should save two different anchors", async () => {

        const otherAnchor = { ...templateAnchor, eui: 0x00000000DECADE00, short: 0x02 };

        addAnchor(templateAnchor);
        addAnchor(otherAnchor);
        expect(getAnchors().size).toBe(2);
    });
});