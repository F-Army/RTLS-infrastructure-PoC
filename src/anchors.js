const Joi = require("joi");
const express = require("express");
const router = express.Router();

let anchors = new Map();

const { anchorScheme } = require("./model/anchors");

router.post("/", async (req, res) => {
    const validation = Joi.validate(req.body, anchorScheme);
    if(validation.error) {
        return res.sendStatus(400);
    }
    
    const arrayAnchors = Array.from(anchors.values());
    const euiAlreadyPresent = arrayAnchors.filter((anchor) => anchor.eui === Number(req.body.eui)).length === 1;

    if(euiAlreadyPresent) {
        return res.sendStatus(409);
    }
    
    anchors.set(parseInt(req.body.short), {
        eui: parseInt(req.body.eui),
        position: {
            x: Number(req.body.x),
            y: Number(req.body.y),
            z: Number(req.body.z),
        }
    });

    return res.sendStatus(200);
});

const getAnchors = () => anchors;

module.exports = { router, getAnchors };
