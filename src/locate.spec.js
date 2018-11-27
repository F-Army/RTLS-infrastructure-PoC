const { locate } = require("./locate");

const position_A = {
    x: 0,
    y: 0,
    z: 0,
};

const position_B = {
    x: 5,
    y: 0,
    z: 0,
};

const position_C = {
    x: 0,
    y: 5,
    z: 0,
};

const anchors_positions = [
    position_A,
    position_B,
    position_C,
];


const calculateAnchorsDataFromTagAndAnchors = (tag, ...anchorsPositions) => {

    const distanceFromTwoPoints = (point1, point2) => Math.sqrt(Math.pow((point1.x - point2.x),2) + Math.pow((point1.y - point2.y),2));
    
    const anchor1_data = {
        position: anchorsPositions[0],
        distance_cm: distanceFromTwoPoints(anchorsPositions[0], tag),
    };

    const anchor2_data = {
        position: anchorsPositions[1],
        distance_cm: distanceFromTwoPoints(anchorsPositions[1], tag),
    };

    const anchor3_data = {
        position: anchorsPositions[2],
        distance_cm: distanceFromTwoPoints(anchorsPositions[2], tag),
    };

    return [anchor1_data, anchor2_data, anchor3_data];
}

describe("Location test", () => {
    it("should locate a node at origin in 2D", () => {
        const tag_position = {
            x: 0, 
            y: 0, 
            z: 0,
        };

        const {x, y, z} = locate(...calculateAnchorsDataFromTagAndAnchors(tag_position, ...anchors_positions));

        expect(x).toBe(0);
        expect(y).toBe(0);
        expect(z).toBe(0);
    });

    it("should locate on x axis", () => {
        const tag_position = {
            x: 3,
            y: 0,
            z: 0,
        };

        const {x} = locate(...calculateAnchorsDataFromTagAndAnchors(tag_position, ...anchors_positions));

        expect(x).toBe(3);
    });

    it("should locate on y axis", () => {

        const tag_position = {
            x: 0,
            y: 3,
            z: 0,
        };

        const {y} = locate(...calculateAnchorsDataFromTagAndAnchors(tag_position, ...anchors_positions));

        expect(y).toBe(3);
    });

    it("should locate an arbitrary position on x,y plane with positive x and positive y approximately", () => {

        const tag_position = {
            x: 2, 
            y: 5, 
            z: 0,
        };

        const {x, y} = locate(...calculateAnchorsDataFromTagAndAnchors(tag_position, ...anchors_positions));

        expect(x).toBeCloseTo(tag_position.x);
        expect(y).toBeCloseTo(tag_position.y);
    });

    it("should locate an arbitrary position on x,y plane with positive x and negative y approximately", () => {

        const tag_position = {
            x: 2, 
            y: -5, 
            z: 0,
        };

        const {x, y} = locate(...calculateAnchorsDataFromTagAndAnchors(tag_position, ...anchors_positions));

        expect(x).toBeCloseTo(tag_position.x);
        expect(y).toBeCloseTo(tag_position.y);
    });

    it("should locate an arbitrary position on x,y plane with negative x and positive y approximately", () => {

        const tag_position = {
            x: -2, 
            y: 5, 
            z: 0,
        };

        const {x, y} = locate(...calculateAnchorsDataFromTagAndAnchors(tag_position, ...anchors_positions));

        expect(x).toBeCloseTo(tag_position.x);
        expect(y).toBeCloseTo(tag_position.y);
    });

    it("should locate an arbitrary position on x,y plane with negative x and negative y approximately", () => {

        const tag_position = {
            x: -2, 
            y: -5, 
            z: 0,
        };

        const {x, y} = locate(...calculateAnchorsDataFromTagAndAnchors(tag_position, ...anchors_positions));

        expect(x).toBeCloseTo(tag_position.x);
        expect(y).toBeCloseTo(tag_position.y);
    });
});
