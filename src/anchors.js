const express = require("express");

const router = express.Router();

let anchors = new Map();

router.post("/", async (req, res) => {
    if(!req.body.eui || !req.body.short)
        return res.sendStatus(400);
    
    const arrayAnchors = Array.from(anchors.values());
    const euiAlreadyPresent = arrayAnchors.filter((anchor) => anchor.eui === Number(req.body.eui)).length === 1;

    if(euiAlreadyPresent) 
        return res.sendStatus(409);
    
    anchors.set(parseInt(req.body.short), {eui: parseInt(req.body.eui)});

    return res.sendStatus(200);
});

const getAnchors = () => anchors;

module.exports = { router, getAnchors };
