const { Collection, User } = require("../models");

class CollectionController {
    static async getAllCollections(req, res, next) {
        try {
            const allCollections = await Collection.findAll();

            res.status(200).json(allCollections);
        }
        catch(error) {
            next(error);
        }
    }
    static async postCollection(req, res, next) {
        try {
            const { collectionName, description } = req.body;
            const UserId = req.user.id;

            const newCollection = await Collection.create({
                collectionName: collectionName,
                description: description,
                UserId: UserId
            });
            
            res.status(201).json({ message: `Collection "${collectionName}" successfully added` });
        }
        catch(error) {
            next(error);
        }
    }
    static async getUsersCollections(req, res, next) {
        try {
            const { username } = req.params;

            const selectedUser = await User.findOne({ where: { username: username } });
            
            if(!selectedUser) {
                throw { name: "SequelizeDatabaseError" };
            }

            const userCollections = await Collection.findAll({ where: { UserId: selectedUser.id } });

            res.status(200).json(userCollections);
        }
        catch(error) {
            next(error);
        }
    }
    static async getCollectionDetails(req, res, next) {
        try {

        }
        catch(error) {
            next(error);
        }
    }
}

module.exports = CollectionController