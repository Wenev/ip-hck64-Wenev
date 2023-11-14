if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors")
const CardCollection = require("./controllers/CardCollectionController.js")
const CollectionController = require("./controllers/CollectionController.js")
const UserController = require("./controllers/UserController.js");
const authentication = require("./middlewares/authentication.js");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post("/register", UserController.registerUser);

app.post("/login", UserController.loginUser);

app.use(errorHandler);

module.exports = app;