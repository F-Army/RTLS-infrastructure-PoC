const Joi = require("joi");

let anchors = new Map();

exports.anchorScheme = Joi.object().keys({
    eui: Joi.number().min(0).max(0xFFFFFFFFFFFFFFFF).required(),
    short: Joi.number().min(0).max(0xFFFF).required(),
    x: Joi.number().required(),
    y: Joi.number().required(),
    z: Joi.number().required(),
});

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