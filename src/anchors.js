const express = require("express");

const router = express.Router();

let anchors = [];

router.post("/", async (req, res) => {
    if(!req.body.eui || !req.body.short)
        return res.sendStatus(400);
    
    anchors[Number(req.body.short)] = {
        eui: Number(req.body.eui),
    }

    return res.sendStatus(200);
});

const getAnchors = () => anchors;

module.exports = { router, getAnchors };
