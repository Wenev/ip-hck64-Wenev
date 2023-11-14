const request = require("supertest");

const app = require("../app.js");
const { Collection, User } = require("../models");

beforeAll(async () => {
    let newUser = await User.create({
        username: "Test User",
        firstName: "James",
        lastName: "Corden",
        email: "james@mailxlx.com",
        password: "TestUser"
    });
    let newCollection = await Collection.create({
        collectionName: "WOE Personal Collection",
        description: "For Test",
        UserId: newUser.id
    });
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