const { Collection } = require("../models");

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
    static async getUsersCollections(req, res, next) {
        try {
            
        }
        catch(error) {
            next(error);
        }
    }
    static async postCollection(req, res, next) {
        try {

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