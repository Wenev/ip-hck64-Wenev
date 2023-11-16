const request = require("supertest");

const app = require("../app.js");
const { Collection, User, CardCollection } = require("../models");
const { createToken }= require("../helpers/jwt");

let newUser;
let token;
let secondUser;
let secondToken;
let newCollection;
let newCard;

beforeAll(async () => {
    newUser = await User.create({
        username: "TestUser",
        firstName: "James",
        lastName: "Corden",
        email: "james@mailxlx.com",
        password: "TestUser"
    });

    secondUser = await User.create({
        username: "jimmy",
        firstName: "Jimmy",
        lastName: "Dollan",
        email: "jimmydollan@mail.com",
        password: "TestUser"
    });

    token = createToken({ id: newUser.id });

    secondToken = createToken({ id: secondUser.id });

    let collections = [
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

    newCollection = await Collection.bulkCreate(collections);

    newCard = await CardCollection.bulkCreate([
        {
            CardId: "f295b713-1d6a-43fd-910d-fb35414bf58a",
            CollectionId: newCollection[0].id,
        },
        {
            CardId: "f295b713-1d6a-43fd-910d-fb35414bf58a",
            CollectionId: newCollection[0].id,
        },
    ]);
});

afterAll(async () => {
    await CardCollection.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });
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
    it("should be able to get all collections", async () => {
        const response = await request(app).get("/collections").set("Authorization", `Bearer ${token}`).query({ search: "woe", page: 1 });

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("page", 1);
        expect(response.body).toHaveProperty("length", expect.any(Number));
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data[0]).toHaveProperty("id", expect.any(Number));
        expect(response.body.data[0]).toHaveProperty("collectionName", "WOE Personal Collection");
        expect(response.body.data[0]).toHaveProperty("UserId", newUser.id);
    });
});

describe("POST /collections", () => {
    it("should be able to post user's collection", async () => {
        const testData = {
            collectionName: "Test Add Collection",
            description: "hello"
        }

        const response = await request(app).post("/collections").set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", `Collection "${testData.collectionName}" successfully added`);
    });

    it("should be able to respond to 401 when user is not logged in", async () => {
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

    it("should be able to respond to 400 when collectionName is invalid", async () => {
        const testData = {
            description: "hello",
        }

        const response = await request(app).post("/collections").set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(400);
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
        const response = await request(app).get(`/collections/wronguser123`).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Data Not Found");
    });
});

describe("GET /collection/:collectionId", () => {
    it("should be able to get collection details", async () => {
        const response = await request(app).get(`/collection/${newCollection[0].id}`).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("collectionName", "WOE Personal Collection");
        expect(response.body.Cards).toBeInstanceOf(Array);
        expect(response.body.Cards[0]).toHaveProperty("CardId", "f295b713-1d6a-43fd-910d-fb35414bf58a");
    });

    it("should be able to respond to 404 when collectionId is invalid", async () => {
        const response = await request(app).get(`/collection/999`);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Data Not Found");
    });
});

describe("PUT /collection/:collectionId", () => {
    it("should be able to edit collection details", async () => {
        const testData = {
            collectionName: "Test Edit",
        }
        const response = await request(app).put(`/collection/${newCollection[0].id}`).set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Collection successfully edited");
    });

    it("should be able to respond to 403 when not owner is editing", async () => {
        const testData = {
            collectionName: "Test Edit",
        }
        const response = await request(app).put(`/collection/${newCollection[0].id}`).set("Authorization", `Bearer ${secondToken}`).send(testData);

        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Forbidden Access");
    });

    it("should be able to respond to 400 when collectionName is invalid", async () => {
        const testData = {
            collectionName: ""
        }
        const response = await request(app).put(`/collection/${newCollection[0].id}`).set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Collection Name must not be empty");
    });

    it("should be able to respond to 404 when collectionId is invalid", async () => {
        const testData = {

        }
        const response = await request(app).put(`/collection/999`).set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Data Not Found");
    });

    it("should be able to response to 401 when user is not logged in", async () => {
        const testData = {
            collectionName: "Test Edit",
        }
        const response = await request(app).put(`/collection/${newCollection[0].id}`).send(testData);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "User hasn't logged in");
    });

    it("should be able to respond to 401 when token is invalid", async () => {
        const testData = {
            collectionName: "Test Edit",
        }
        const response = await request(app).put(`/collection/${newCollection[0].id}`).set("Authorization", `Bearer InvalidToken`).send(testData);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "jwt malformed");
    });
});

describe("DELETE /collection/:collectionId", () => {
    it("should be able to delete collection", async () => {
        const response = await request(app).delete(`/collection/${newCollection[1].id}`).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Collection LOTR Personal Collection has been deleted");
    });

    it("should be able to response 403 when not owner deletes collection", async () => {
        const response = await request(app).delete(`/collection/${newCollection[0].id}`).set("Authorization", `Bearer ${secondToken}`);

        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Forbidden Access");
    });
});