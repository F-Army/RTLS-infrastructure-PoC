const express = require("express");
const request = require("supertest");
const rangeRoute = require("./range");
const bodyParser = require("body-parser");

const initRoute = (route) => {
    const app = express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use("/range", route);
    return app;
};

describe("/range/ Range route tests", () => {

    it("should send back 400 if receives invalid data", async () => {
        const app = initRoute(rangeRoute);
        const res = await request(app).post("/range").send("test=Invalid&test2=Invalid");
        expect(res.status).toBe(400);
    });

    it("should send back 200 if receives valid parameters", async () => {
        const app = initRoute(rangeRoute);
        const res = await request(app).post("/range").send("anchor=2&tag=5&range=25.2");
        expect(res.status).toBe(200);
    });

    it("should send back 400 if it doesn't receive all mandatory arguments", async () => {
        const app = initRoute(rangeRoute);
        const res = await request(app).post("/range").send("anchor=2&tag=5");
        expect(res.status).toBe(400);
    });

    it("should send back 400 if it doesn't receive all correct arguments", async () => {
        const app = initRoute(rangeRoute);
        const res = await request(app).post("/range").send("anchor=CIAO&tag=5&range=205");
        expect(res.status).toBe(400);
    });

    it("should send back 404 if the request is a GET request", async () => {
        const app = initRoute(rangeRoute);
        const res = await request(app).get("/range");
        expect(res.status).toBe(404);
    });

    it("should send back 404 if the request is PUT request", async () => {
        const app = initRoute(rangeRoute);
        const res = await request(app).put("/range");
        expect(res.status).toBe(404);
    });

    it("should send back 404 if the request is HEAD request", async () => {
        const app = initRoute(rangeRoute);
        const res = await request(app).head("/range");
        expect(res.status).toBe(404);
    });

    it("should send back 404 if the request is DELETE request", async () => {
        const app = initRoute(rangeRoute);
        const res = await request(app).delete("/range");
        expect(res.status).toBe(404);
    });

    it("should send back 404 if the request is OPTIONS request", async () => {
        const app = initRoute(rangeRoute);
        const res = await request(app).options("/range");
        expect(res.status).toBe(200);
    });

    it("should send back 404 if the request is TRACE request", async () => {
        const app = initRoute(rangeRoute);
        const res = await request(app).trace("/range");
        expect(res.status).toBe(404);
    });
});