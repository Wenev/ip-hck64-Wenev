const { User } = require("../models");
const { comparePass } = require("../helpers/bcrypt.js");
const { createToken } = require("../helpers/jwt.js");

class UserController {
    static async registerUser(req, res, next) {
        try {
            const { username, firstName, lastName, email, password } = req.body;
            const register = await User.create({
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            });

            res.status(201).json({ message: `User ${register.username} has been created` });
        }
        catch(error) {
            next(error);
        }
    }
    static async loginUser(req, res, next) {
        try {
            const { username, email, password } = req.body;

            if(!username && !email) {
                throw { name: "InvalidInput", field: "Email/Username" };
            }

            if(!password) {
                throw { name: "InvalidInput", field: "Password" };
            }

            let user;
            if(email) {
                user = await User.findOne({ where: { email: email }});
            }
            else if(username) {
                user = await User.findOne({ where: { username: username }});
            }

            if(!user) {
                throw { name: "Unauthenticated" };
            }

            const comparePassword = comparePass(password, user.password);
            if(!comparePassword) {
                throw { name: "Unauthenticated" };
            }
            
            const token = createToken({ id: user.id });

            res.status(200).json({ access_token: token });
        }
        catch(error) {
            if(error.name === "InvalidInput") {
                error.message = `${error.field} must not be empty`;
            }
            if(error.name === "Unauthenticated") {
                error.message = `Invalid Email/Username/Password`;
            }
            next(error);
        }
    }
    static async googleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.g_token,
                audience: process.env.G_CLIENT,
            });
            const payload = ticket.getPayload();

            const firstName = payload.given_name;
            const lastName = payload.family_name;
            const username = payload.sub;
            const  { email } = payload;

            let user = await User.findOne({where: {email: email, username: username}});
            if(!user) {
                user = await User.create({
                   firstName: firstName,
                   lastName: lastName,
                   username: username,
                   email: email,
                   password: String(Math.random())
                });
            }

            res.status(200).json({access_token: createToken({id: user.id})})
        }
        catch(error) {
            next(error);
        }
    }
}

module.exports = UserController