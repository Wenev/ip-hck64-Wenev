const request = require("supertest");

const app = require("../app.js");
const { User } = require("../models");

beforeAll(async () => {
    let newUser = await User.create({
        username: "TestUser",
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
            username: "JoeBiden",
            firstName: "Joe",
            lastName: "Biden",
            email: "bidenjoe@mailxlx.com",
            password: "TestUser"
        }

        const response = await request(app).post("/register").send(testData);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "User JoeBiden has been created");
    });

    it("should be able to respond to 400 when password is below 8 characters", async () => {
        const testData = {
            username: "JoeBiden",
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

    it("should be able to respond to 400 when Username is not alphanumberic", async () => {
        const testData = {
            username: "Test User",
            firstName: "Joe",
            lastName: "Biden",
            email: "newother@mailxlx.com",
            password: "Passwordistrue"
        }

        const response = await request(app).post("/register").send(testData);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Username must only contain letters or numbers");
    });

    it("should be able to respond to 400 when Username already used", async () => {
        const testData = {
            username: "TestUser",
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

describe("POST /login", () => {
    it("should be able to login and send access token when using username", async () => {
        const testData = {
            username: "TestUser",
            password: "TestUser"
        }

        const response = await request(app).post("/login").send(testData);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("access_token", expect.any(String));
    });

    it("should be able to login and send access token when using email", async () => {
        const testData = {
            email: "james@mailxlx.com",
            password: "TestUser"
        }

        const response = await request(app).post("/login").send(testData);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("access_token", expect.any(String));
    });

    it("should be able to respond to 400 when email/username is empty", async () => {
        const testData = {
            password: "TestUser"
        }

        const response = await request(app).post("/login").send(testData);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Email/Username must not be empty");
    });

    it("should be able to respond to 400 when password is empty", async () => {
        const testData = {
            email: "james@mailxlx.com"
        }

        const response = await request(app).post("/login").send(testData);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Password must not be empty");
    });

    it("should be able to respond to 401 when password is wrong", async () => {
        const testData = {
            email: "james@mailxlx.com",
            password: "WrongPassword"
        }

        const response = await request(app).post("/login").send(testData);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Email/Username/Password");
    });

    it("should be able to respond to 401 when email is wrong", async () => {
        const testData = {
            email: "wrong.email@mailxlx.com",
            password: "TestUser"
        }

        const response = await request(app).post("/login").send(testData);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Email/Username/Password");
    });
});