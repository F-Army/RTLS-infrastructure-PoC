const express = require("express");
const request = require("supertest");
const anchors = require("./anchors");
const bodyParser = require("body-parser");

const { router } = anchors;
const { getAnchors } = require("./model/anchors");

const anchorRoute = router;

const initRoute = (route) => {
    const app = express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use("/anchor", route);
    return app;
};

describe("/anchor/ Anchor route tests", () => {

    beforeEach(() => {
        getAnchors().clear();
    });

    it("should send back 400 if receives invalid data", async () => {
        const app = initRoute(anchorRoute);
        const res = await request(app).post("/anchor").send("test=Invalid&test2=Invalid");
        expect(res.status).toBe(400);
    });

    it("should send 200 if data is valid", async () => {
        const eui = 0x00000000DECADECA;
        const short = 0x01;
        const app = initRoute(anchorRoute);
        const res = await request(app).post("/anchor").send(`eui=${eui}&short=${short}&x=0&y=0&z=0`);
        expect(res.status).toBe(200);
    });

    it("should return 409 if trying to save the same anchor (eui)", async () => {
        const eui = 0x00000000DECADECA;
        const oldShort = 0x01;
        const newShort = 0x02;
        const app = initRoute(anchorRoute);
        await request(app).post("/anchor").send(`eui=${eui}&short=${oldShort}&x=-0.1&y=0.1&z=0.1`);
        const res2 = await request(app).post("/anchor").send(`eui=${eui}&short=${newShort}&x=-0.1&y=0.1&z=0.1`);
        expect(res2.status).toBe(409);
    });
});
