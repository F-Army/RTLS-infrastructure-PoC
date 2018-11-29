const express = require("express");
const Joi = require("joi");

const { addRange, rangeSchema } = require("./devicesRange");

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
