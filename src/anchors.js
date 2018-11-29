const Joi = require("joi");
const express = require("express");
const router = express.Router();

const { anchorScheme, getAnchors, addAnchor } = require("./model/anchors");

const euiAlreadyPresent = (eui) => {
    const arrayAnchors = Array.from(getAnchors().values());
    return arrayAnchors.filter((anchor) => anchor.eui === Number(eui)).length === 1;
}

router.post("/", async (req, res) => {
    const validation = Joi.validate(req.body, anchorScheme);
    if(validation.error) {
        return res.sendStatus(400);
    }
    

    if(euiAlreadyPresent(req.body.eui)) return res.sendStatus(409);

    addAnchor(req.body);
    
    return res.sendStatus(200);
});



module.exports = { router };
