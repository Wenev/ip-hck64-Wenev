const { User, Collection, CardCollection } = require("../models");

async function ownerAuthorization(req, res, next) {
    try {
        const { collectionId } = req.params;
        const collection = await Collection.findByPk(collectionId);
        console.log(collection)
        if(!collection) {
            throw { name: "SequelizeDatabaseError" };
        }

        if(req.user.id === collection.UserId) {
            next();
        }
        else {
            throw { name: `Forbidden` };
        }
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    ownerAuthorization,
}