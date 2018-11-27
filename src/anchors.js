const express = require("express");

const router = express.Router();

let anchors = [];

router.post("/", async (req, res) => {
    if(!req.body.eui || !req.body.short)
        return res.sendStatus(400);
    
    const euiAlreadyPresent = anchors.filter((anchor) => anchor.eui === Number(req.body.eui)).length === 1;

    if(euiAlreadyPresent) 
        return res.sendStatus(409);
    
    console.log("PRIMA",anchors);
    anchors[Number(req.body.short)] = {
        eui: Number(req.body.eui),
    }
    console.log("DOPO",anchors);

    return res.sendStatus(200);
});

const getAnchors = () => anchors;

const clearAll = () => {
    anchors = [];
};

module.exports = { router, getAnchors, clearAll };
