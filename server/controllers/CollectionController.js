const { default: axios } = require("axios");
const { delay } = require("../helpers/delay");
const { CardCollection, Collection, User } = require("../models");
const { scryfallUrl } = require("../URLs");

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
            const { collectionId } = req.params;

            const collection = await Collection.findOne({
                where: {
                    id: collectionId,
                },
                include: {
                    model: CardCollection,
                    as: "Cards",
                },
            });

            if(!collection) {
                throw { name: "SequelizeDatabaseError" };
            }

            collection.Cards.map(async (card) => {
                card.data = await axios({
                    method: "get",
                    url: `${scryfallUrl}/${card.CardId}`
                })
                await delay(80);
                return card;
            });

            res.status(200).json(collection);
        }
        catch(error) {
            next(error);
        }
    }
    static async editCollection(req, res, next) {
        try {
            const { collectionName, description } = req.body;
            const UserId = req.user.id
            const { collectionId } = req.params;
            const editCollection = await Collection.update({
                collectionName: collectionName,
                description: description,
                UserId: UserId
            },{
                where: {
                    id: collectionId,
                }
            });
            

            res.status(200).json({ message: "Collection successfully edited"});
        }
        catch(error) {
            next(error);
        }
    }
    static async deleteCollection(req, res, next) {
        try {
            const { collectionId } = req.params;
            console.log(collectionId)

            const selectedCollection = await Collection.findByPk(collectionId);
            if(!selectedCollection) {
                throw { name: "SequelizeDatabaseError" };
            }

            const deleteCollection = await Collection.destroy({
                where: {
                    id: collectionId
                }
            });

            res.status(200).json({ message: `Collection ${selectedCollection.collectionName} has been deleted` });
        }
        catch(error) {
            next(error);
        }
    }
}

module.exports = CollectionController