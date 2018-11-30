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

router.get("/:short", async (req,res) => {
    const anchor = getAnchors().get(parseInt(req.params.short));
    res.setHeader('Content-Type', 'application/json');

    if(anchor) {
        return res.status(200).send(JSON.stringify(anchor, null, 3));
    }

    return res.sendStatus(400);
});

router.put("/:short", async (req,res) => {
    const anchor = getAnchors().get(parseInt(req.params.short));
    if(anchor) {
        if(req.body.eui)
            anchor.eui = parseInt(req.body.eui);
        if(req.body.x)
            anchor.position.x = parseInt(req.body.x);
        if(req.body.y)
            anchor.position.y = parseInt(req.body.y);
        if(req.body.z)
            anchor.position.z = parseInt(req.body.z);

        res.setHeader('Content-Type', 'application/json');

        return res.status(200).send(JSON.stringify(anchor, null, 3));
    }

    return res.sendStatus(400);
});

module.exports = { router };
