const bcrypt = require("bcrypt");

function hashPass(plainPass) {
    return bcrypt.hashSync(plainPass, bcrypt.genSaltSync(10));
}

function comparePass(plainPass, hashedPass) {
    return bcrypt.compareSync(plainPass, hashedPass);
}

module.exports = {
    hashPass,
    comparePass,
}