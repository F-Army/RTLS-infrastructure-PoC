const express = require("express");
const request = require("supertest");
const anchors = require("./anchors");
const bodyParser = require("body-parser");

const { router, getAnchors} = anchors;

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

    it("should send back 400 if receives invalid data", async () => {
        const app = initRoute(anchorRoute);
        const res = await request(app).post("/anchor").send("test=Invalid&test2=Invalid");
        expect(res.status).toBe(400);
    });

    it("should send 200 if data is valid", async () => {
        const app = initRoute(anchorRoute);
        const res = await request(app).post("/anchor").send("eui=0xDECADECA&short=0x01");
        expect(res.status).toBe(200);
    });

    it("should save anchor when receiving valid data", async () => {
        const app = initRoute(anchorRoute);
        const res = await request(app).post("/anchor").send("eui=0xDECADECA&short=0x01");
        expect(getAnchors()["1"].eui).toBe(0xDECADECA);
    });

    it("should update anchor when receving a different eui for the same short address", async () => {
        const app = initRoute(anchorRoute);
        const res = await request(app).post("/anchor").send("eui=0xDECADECA&short=0x01");
        const res2 = await request(app).post("/anchor").send("eui=0xDECADE00&short=0x01");
        console.log(getAnchors()["1"].eui);
        expect(getAnchors()["1"].eui).toBe(0xDECADE00);
    });
});
