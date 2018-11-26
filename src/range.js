const express = require("express");
const Joi = require("joi");

const router = express.Router();

const rangeSchema = Joi.object().keys({
    anchor: Joi.number().min(0).max(65536).required(),
    tag:    Joi.number().min(0).max(65536).required(),
    range:  Joi.number().min(0).max(200).required(),
});

router.post("/", async (req, res) => {
    const validation = Joi.validate(req.body, rangeSchema);
    if(validation.error) {
        return res.sendStatus(400);
    }
    return res.sendStatus(200);
});

module.exports = router;
