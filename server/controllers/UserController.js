const { User } = require("../models");
const { hash} = rquire("../helpers/bcrypt.js");

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


        }
        catch(error) {
            if(error.name === "InvalidInput") {
                error.message = `${error.field}`
            }
            next(error);
        }
    }
}

module.exports = UserController