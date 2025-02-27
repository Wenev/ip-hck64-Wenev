const request = require("supertest");

const app = require("../app.js");
const { CardCollection, Collection, User } = require("../models");
const { createToken }= require("../helpers/jwt");
const CardCollectionController = require("../controllers/CardCollectionController.js");

let newUser;
let token;
let secondUser;
let secondToken;
let newCollection;
let card;

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

    secondToken = createToken({ id: secondUser.id })

    newCollection = await Collection.create({
        collectionName: "WOE Personal Collection",
        description: "For Test",
        UserId: newUser.id
    });

    card = await CardCollection.create({
        CardId: "f295b713-1d6a-43fd-910d-fb35414bf58a",
        CollectionId: newCollection.id,
        ownedFrom: new Date(),
        purchasePrice: 1.00
    });
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

describe("GET /cards", () => {
    it("should be able to get cards based on name search", async () => {
        const response = await request(app).get("/cards").query({ search: "Brago, King Eternal" }).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data[0]).toHaveProperty("id", expect.any(String));
        expect(response.body.data[0]).toHaveProperty("name", "Brago, King Eternal");
    });

    it("should be able to respond to 401 when user not logged in", async () => {
        const response = await request(app).get("/cards").query({ search: "Brago, King Eternal" });

       expect(response.status).toBe(401);
       expect(response.body).toBeInstanceOf(Object);
       expect(response.body).toHaveProperty("message", "User hasn't logged in");
    });

    it("should be able to respond to 401 when token is invalid", async () => {
        const response = await request(app).get("/cards").query({ search: "Brago, King Eternal" }).set("Authorization", `Bearer InvalidToken`);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "jwt malformed");
     });


});

describe("POST /collection/:collectionId", () => {
    it("should be able to post cards to collections", async () => {
        const testData = {
            CardId: "0ac3fb08-741a-49e5-9fae-b26819677d24",
            purchasePrice: 1.00,
            ownedFrom: new Date()
        }

        const response = await request(app).post(`/collection/${newCollection.id}`).set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", `Brago, King Eternal added to WOE Personal Collection`);
     });

     it("should be able to respond to 404 when collectionId is invalid", async () => {
        const testData = {
            CardId: "0ac3fb08-741a-49e5-9fae-b26819677d24",
            purchasePrice: 1.00,
            ownedFrom: new Date()
        }

        const response = await request(app).post(`/collection/999`).set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Data Not Found");
     });

     it("should be able to respond to 404 when CardId not found", async () => {
        const testData = {
            CardId: "wrongId",
            purchasePrice: 1.00,
            ownedFrom: new Date()
        }

        const response = await request(app).post(`/collection/${newCollection.id}`).set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Data Not Found");
     });

     it("should be able to respond to 400 when ownedFrom is not a date", async () => {
        const testData = {
            CardId: "0ac3fb08-741a-49e5-9fae-b26819677d24",
            purchasePrice: 1.00,
            ownedFrom: "wrongDate"
        }

        const response = await request(app).post(`/collection/${newCollection.id}`).set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Owned Date must be a Date");
     });

     it("should be able to respond to 400 when purchasePrice is not a number", async () => {
        const testData = {
            CardId: "0ac3fb08-741a-49e5-9fae-b26819677d24",
            purchasePrice: "Hello",
            ownedFrom: new Date()
        }

        const response = await request(app).post(`/collection/${newCollection.id}`).set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Purchase Price must be a Number");
     });

     it("should be able to respond to 400 when CardId is empty", async () => {
        const testData = {
            purchasePrice: 1.00,
            ownedFrom: new Date()
        }

        const response = await request(app).post(`/collection/${newCollection.id}`).set("Authorization", `Bearer ${token}`).send(testData);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "CardId must not be empty");
     });

     it("should be able to respond to 401 when user not logged in", async () => {
        const testData = {
            CardId: "0ac3fb08-741a-49e5-9fae-b26819677d24",
            purchasePrice: 1.00,
            ownedFrom: new Date()
        }

        const response = await request(app).post(`/collection/${newCollection.id}`).send(testData);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "User hasn't logged in");
     });

     it("should be able to respond to 401 when token is invalid", async () => {
        const testData = {
            CardId: "0ac3fb08-741a-49e5-9fae-b26819677d24",
            purchasePrice: 1.00,
            ownedFrom: new Date()
        }

        const response = await request(app).post(`/collection/${newCollection.id}`).set("Authorization", `Bearer InvalidToken`).send(testData);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "jwt malformed");
     });
});

describe("PUT /collection/:collectionId/:cardId", () => {
    it("should be able to edit collection cards", async () => {
        const testData = {
            CardId: "f295b713-1d6a-43fd-910d-fb35414bf58a",
            purchasePrice: 1.00,
            ownedFrom: new Date()
        }

        const response = await request(app).put(`/collection/${newCollection.id}/${card.id}`).set("Authorization", `Bearer ${token}`).send(testData);        
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Card has been edited");
    });

    it("should be able to respond to 403 when not owner edits the cards", async () => {
        const testData = {
            CardId: "f295b713-1d6a-43fd-910d-fb35414bf58a",
            purchasePrice: 1.00,
            ownedFrom: new Date()
        }

        const response = await request(app).put(`/collection/${newCollection.id}/${card.id}`).set("Authorization", `Bearer ${secondToken}`).send(testData);        
        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Forbidden Access");
    });
});

describe("DELETE /collection/:collectionId/:cardId", () => {
    it("should be delete card from collection", async () => {
        const response = await request(app).delete(`/collection/${newCollection.id}/${card.id}`).set("Authorization", `Bearer ${token}`);        
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Card has successfully deleted");
    });

    it("should be able to respond 403 when not owner deletes the cards", async () => {
        const response = await request(app).delete(`/collection/${newCollection.id}/${card.id}`).set("Authorization", `Bearer ${secondToken}`);        
        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Forbidden Access");
    });
});