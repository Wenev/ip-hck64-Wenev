const request = require("supertest");

const app = require("../app.js");
const { User } = require("../models");
const { createToken } = require("../helpers/jwt.js");

let token;

beforeAll(async () => {
    let newUser = await User.create({
        username: "Test User",
        firstName: "James",
        lastName: "Corden",
        email: "james@mailxlx.com",
        password: "TestUser"
    });
});

afterAll(async () => {
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });
});

describe("POST /register", () => {
    it("should be able to register user to database", async () => {
        const testData = {
            username: "Joe Biden",
            firstName: "Joe",
            lastName: "Biden",
            email: "bidenjoe@mailxlx.com",
            password: "TestUser"
        }

        const response = await request(app).post("/register").send(testData);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "User Joe Biden has been created");
    });

    it("should be able to respond to 400 when password is below 8 characters", async () => {
        const testData = {
            username: "Joe Biden",
            firstName: "Joe",
            lastName: "Biden",
            email: "example@mailxlx.com",
            password: "cannot"
        }

        const response = await request(app).post("/register").send(testData);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Password must be 8 characters or longer");
    });

    it("should be able to respond to 400 when email already used", async () => {
        const testData = {
            username: "joe",
            firstName: "Joe",
            lastName: "Biden",
            email: "james@mailxlx.com",
            password: "Passwordistrue"
        }

        const response = await request(app).post("/register").send(testData);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Email has already been used");
    });

    it("should be able to respond to 400 when Username already used", async () => {
        const testData = {
            username: "Test User",
            firstName: "Joe",
            lastName: "Biden",
            email: "other@mailxlx.com",
            password: "Passwordistrue"
        }

        const response = await request(app).post("/register").send(testData);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Username has already been used");
    });
});