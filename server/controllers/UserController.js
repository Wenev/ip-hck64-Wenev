const { User } = require("../models");

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
}

module.exports = UserController