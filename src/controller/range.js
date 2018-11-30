const express = require("express");
const Joi = require("joi");

const { addRange, getRanges, updateRange } = require("../model/range");

const rangeSchema = Joi.object().keys({
    anchor: Joi.number().min(0).max(65535).required(),
    tag:    Joi.number().min(0).max(65535).required(),
    range:  Joi.number().min(0).required(),
});

const router = express.Router();

router.post("/", async (req, res) => {
    const validation = Joi.validate(req.body, rangeSchema);
    if(validation.error) {
        return res.sendStatus(400);
    }

    const alreadyHasRangeFromAnchor = () => {
        const tagRanges = getRanges().get(parseInt(req.body.tag));
        if(!tagRanges) return false;
        
        return tagRanges.filter((rangeItem) => rangeItem.anchor === parseInt(req.body.anchor)).length === 1;
    }
        
    if(alreadyHasRangeFromAnchor()) {
        updateRange(req.body);
    } else {
        addRange({anchor: parseInt(req.body.anchor), tag: parseInt(req.body.tag), range: Number(req.body.range)});
    }

    return res.sendStatus(200);
});

module.exports = router;
