const { decodeToken } = require("../helpers/jwt.js");
const { User } = require("../models");

async function authentication(req, res, next) {
    try {
        const { authorization } = req.headers;
        if(!authorization) {
            throw { name: "InvalidToken", message: "User hasn't logged in" };
        }
        const rawToken = authorization.split(" ");
        if(rawToken.length < 2) {
            throw { name: "InvalidToken", message: "Token Malformed" };
        }
        if(rawToken[0] !== "Bearer") {
            throw { name: "InvalidToken", message: "Wrong auth schemes" };
        }

        const token = rawToken[1];

        const payload = decodeToken(token);
        const user = await User.findByPk(payload.id);
        if(!user) {
            throw { name: "InvalidToken", message: "User Not Found" };
        }

        req.user = user;
        next();
    }
    catch(error) {
        next(error);
    }
}

module.exports = authentication;