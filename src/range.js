const express = require("express");
const Joi = require("joi");

const { addRange } = require("./model/range");

const rangeSchema = Joi.object().keys({
    anchor: Joi.number().min(0).max(65535).required(),
    tag:    Joi.number().min(0).max(65535).required(),
    range:  Joi.number().positive().required(),
});

const router = express.Router();

router.post("/", async (req, res) => {
    const validation = Joi.validate(req.body, rangeSchema);
    if(validation.error) {
        return res.sendStatus(400);
    }
    addRange({anchor: parseInt(req.body.anchor), tag: parseInt(req.body.tag), range: Number(req.body.range)});
    return res.sendStatus(200);
});

module.exports = router;
