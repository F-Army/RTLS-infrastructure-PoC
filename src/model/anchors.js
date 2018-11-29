let anchors = new Map();

exports.getAnchors = () => anchors;

exports.addAnchor = (anchor) => {
    anchors.set(parseInt(anchor.short), {
        eui: parseInt(anchor.eui),
        position: {
            x: Number(anchor.x),
            y: Number(anchor.y),
            z: Number(anchor.z),
        }
    });
};