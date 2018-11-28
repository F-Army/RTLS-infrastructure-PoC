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

    beforeEach(() => {
        getAnchors().clear();
    });

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
        const short = 0x01
        const app = initRoute(anchorRoute);
        await request(app).post("/anchor").send(`eui=0xDECADECA&short=${short}`);
        expect(getAnchors().get(short).eui).toBe(0xDECADECA);
    });

    it("should update anchor when receving a different eui for the same short address", async () => {
        const short = 0x01;
        const oldEui = 0xDECADECA;
        const newEui = 0xDECADE00;
        const app = initRoute(anchorRoute);
        await request(app).post("/anchor").send(`eui=${oldEui}&short=${short}`);
        await request(app).post("/anchor").send(`eui=${newEui}&short=${short}`);
        expect(getAnchors().get(short).eui).toBe(newEui);
    });

    it("should not save the same anchor twice", async () => {
        const eui = 0xDECADECA;
        const app = initRoute(anchorRoute);
        await request(app).post("/anchor").send(`eui=${eui}&short=0x01`);
        await request(app).post("/anchor").send(`eui=${eui}&short=0x02`);
        expect(getAnchors().size).toBe(1);        
    });

    it("should return 409 if trying to save the same anchor (eui)", async () => {
        const app = initRoute(anchorRoute);
        await request(app).post("/anchor").send("eui=0xDECADECA&short=0x01");
        const res2 = await request(app).post("/anchor").send("eui=0xDECADECA&short=0x02");
        expect(res2.status).toBe(409);
    });

    it("should save two different anchors", async () => {
        const app = initRoute(anchorRoute);
        await request(app).post("/anchor").send("eui=0xDECADECA&short=0x01");
        await request(app).post("/anchor").send("eui=0xDECADE00&short=0x02");
        console.log(getAnchors());
        expect(getAnchors().size).toBe(2);
    });
});
