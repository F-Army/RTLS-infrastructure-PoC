const Joi = require("joi");
const express = require("express");
const router = express.Router();

let anchors = new Map();

const { anchorScheme, getAnchors, addAnchor } = require("./model/anchors");

router.post("/", async (req, res) => {
    const validation = Joi.validate(req.body, anchorScheme);
    if(validation.error) {
        return res.sendStatus(400);
    }
    
    const arrayAnchors = Array.from(getAnchors().values());
    const euiAlreadyPresent = arrayAnchors.filter((anchor) => anchor.eui === Number(req.body.eui)).length === 1;

    if(euiAlreadyPresent) {
        return res.sendStatus(409);
    }

    addAnchor(req.body);
    
    return res.sendStatus(200);
});



module.exports = { router };
