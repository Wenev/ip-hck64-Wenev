const { User, Collection, CardCollection } = require("../models");

async function ownerAuthorization(req, res, next) {
    try {
        const { collectionId } = req.params;
        const collection = await Collection.findByPk(collectionId);

        if(req.user.id === collection.UserId) {
            next();
        }
        else {
            throw `Forbidden`;
        }
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    ownerAuthorization,
}