const request = require("supertest");

const app = require("../app.js");
const { Collection, User } = require("../models");
const { createToken }= require("../helpers/jwt")

let newUser;
let token;

beforeAll(async () => {
    newUser = await User.create({
        username: "TestUser",
        firstName: "James",
        lastName: "Corden",
        email: "james@mailxlx.com",
        password: "TestUser"
    });

    token = createToken({ id: newUser.id });

    let newCollection = [
        {
            collectionName: "WOE Personal Collection",
            description: "For Test",
            UserId: newUser.id
        },
        {
            collectionName: "LOTR Personal Collection",
            description: "For Test",
            UserId: newUser.id
        },
    ];
    await Collection.bulkCreate(newCollection);
});

afterAll(async () => {
    await Collection.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });
});

describe("GET /collections", () => {
    it("should be able to get all users' collections", async () => {
        const response = await request(app).get("/collections").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty("id", expect.any(Number));
        expect(response.body[0]).toHaveProperty("collectionName", "WOE Personal Collection");
        expect(response.body[0]).toHaveProperty("UserId", newUser.id);
    });

    it("should be able to respond to when token not logged in", async () => {
        const response = await request(app).get("/collections");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "User hasn't logged in");
    });

    it("should be able to respond to when token is invalid", async () => {
        const response = await request(app).get("/collections").set("Authorization", `Bearer InvalidToken`);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "jwt malformed");
    });
});

describe("POST /collections", () => {
    it("should be able to post user's collection", async () => {
        const testData = {
            collectionName: "Test Add Collection",
            description: "hello",
        }

        const response = await request(app).post("/collections").set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("collectionName", "WOE Personal Collection");
        expect(response.body).toHaveProperty("UserId", newUser.id);
        expect(response.body).toHaveProperty("message", `Collection "${testData.collectionName}" successfully added`);
    });

    it("should be able to respond to 401 when token not logged in", async () => {
        const testData = {
            collectionName: "Test Add Collection",
            description: "hello",
        }

        const response = await request(app).post("/collections").send(testData);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "User hasn't logged in");
    });

    it("should be able to respond to 401 when token is invalid", async () => {
        const testData = {
            collectionName: "Test Add Collection",
            description: "hello",
        }

        const response = await request(app).post("/collections").set("Authorization", `Bearer InvalidToken`).send(testData);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "jwt malformed");
    });

    it("should be able to respond to 400 when token is invalid", async () => {
        const testData = {
            description: "hello",
        }

        const response = await request(app).post("/collections").set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Collection Name must not be empty");
    });
});

describe("GET /collections/:username", () => {
    it("should be able to get all users' collections", async () => {
        const response = await request(app).get(`/collections/${newUser.username}`).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty("id", expect.any(Number));
        expect(response.body[0]).toHaveProperty("collectionName", "WOE Personal Collection");
        expect(response.body[0]).toHaveProperty("UserId", newUser.id);
    });

    it("should be able to respond to 404 when username is invalid", async () => {
        const response = await request(app).get(`/collections/wronguser123`);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Data Not Found");
    });

    it("should be able to respond to 401 when token not logged in", async () => {
        const response = await request(app).get(`/collections/${newUser.username}`);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "User hasn't logged in");
    });

    it("should be able to respond to 401 when token is invalid", async () => {
        const response = await request(app).get(`/collections/${newUser.username}`).set("Authorization", `Bearer InvalidToken`);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "jwt malformed");
    });
});