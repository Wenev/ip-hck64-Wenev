if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors")
const CardCollectionController = require("./controllers/CardCollectionController.js")
const CollectionController = require("./controllers/CollectionController.js")
const UserController = require("./controllers/UserController.js");
const authentication = require("./middlewares/authentication.js");
const errorHandler = require("./middlewares/errorHandler.js");
const { ownerAuthorization } = require("./middlewares/authorization.js")

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post("/register", UserController.registerUser);

app.post("/login", UserController.loginUser);

app.get("/collections", CollectionController.getAllCollections);

app.get("/collections/:username", CollectionController.getUsersCollections);

app.get("/collection/:collectionId", CollectionController.getCollectionDetails);

app.use(authentication);

app.post("/collections", CollectionController.postCollection);

app.delete("/collections/:collectionId", ownerAuthorization, CollectionController.deleteCollection);

app.put("/collection/:collectionId", ownerAuthorization, CollectionController.editCollection);

app.post("/collection/:collectionId", CardCollectionController.addCardToCollection);

app.put("/collection/:collectionId/:cardCollectionId", ownerAuthorization, CardCollectionController.editCardsInCollection);

app.delete("/collection/:collectionId/:cardCollectionId", ownerAuthorization, CardCollectionController.deleteCardsInCollection);

app.get("/cards", CardCollectionController.getCardsFromScryfall);

app.use(errorHandler);

module.exports = app;