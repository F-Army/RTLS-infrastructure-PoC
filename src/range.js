const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
    const {anchor, tag, range} = req.body;
    if(!anchor || !tag || !range) 
        return res.sendStatus(400);
    
    return res.sendStatus(200);
});

module.exports = router;
