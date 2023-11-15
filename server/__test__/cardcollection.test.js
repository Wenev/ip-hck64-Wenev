const request = require("supertest");

const app = require("../app.js");
const { Collection, User } = require("../models");
const { createToken }= require("../helpers/jwt");

let newUser;
let token;
let newCollection;

beforeAll(async () => {
    newUser = await User.create({
        username: "TestUser",
        firstName: "James",
        lastName: "Corden",
        email: "james@mailxlx.com",
        password: "TestUser"
    });

    token = createToken({ id: newUser.id });

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

describe("GET /cards", () => {
    it("should be able to get cards based on name search", async () => {
        const response = await request(app).get("/cards").query({ search: "Brago, King Eternal" }).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data[0]).toHaveProperty("id", expect.any(String));
        expect(response.body.data[0]).toHaveProperty("name", "Brago, King Eternal");
    });
});