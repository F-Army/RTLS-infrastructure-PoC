const Joi = require("joi");
const express = require("express");
const router = express.Router();

const { getAnchors, addAnchor } = require("../model/anchors");

const euiAlreadyPresent = (eui) => {
    const arrayAnchors = Array.from(getAnchors().values());
    return arrayAnchors.filter((anchor) => anchor.eui === Number(eui)).length === 1;
}

const anchorScheme = Joi.object().keys({
    eui: Joi.number().min(0).max(0xFFFFFFFFFFFFFFFF).required(),
    short: Joi.number().min(0).max(0xFFFF).required(),
    x: Joi.number().required(),
    y: Joi.number().required(),
    z: Joi.number().required(),
});

router.post("/:short", async (req, res) => {
    const newAnchor = {short: req.params.short, ...req.body};
    const validation = Joi.validate(newAnchor, anchorScheme);
    if(validation.error) {
        return res.sendStatus(400);
    }
    
    if(euiAlreadyPresent(req.body.eui)) return res.sendStatus(409);

    addAnchor(newAnchor);
    
    return res.sendStatus(200);
});



module.exports = { router };
