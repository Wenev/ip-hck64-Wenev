const axios = require("axios");
const { scryfallUrl } = require("../URLs.js");
const { CardCollection, Collection } = require("../models");

class CardCollectionController {
    static async addCardToCollection(req, res, next) {
        try {
            const { CardId, ownedFrom, purchasePrice } = req.body;

            if(!CardId) {
                throw { name: "InvalidInput", message: "CardId must not be empty" };
            }

            const { data } = await axios({
                method: "get",
                url: `${scryfallUrl}/cards/${CardId}`
            });

            const { collectionId } = req.params;

            const selectedCollection = await Collection.findByPk(collectionId);

            if(!selectedCollection) {
                throw { name: "SequelizeDatabaseError" };
            }

            const addCard = await CardCollection.create({
                CardId: CardId,
                ownedFrom: ownedFrom,
                purchasePrice: purchasePrice,
                CollectionId: collectionId
            });

            res.status(201).json({ message: `${data.name} added to ${selectedCollection.collectionName}` });
        }
        catch(error) {
            next(error);
        }
    }
    static async getCardsFromScryfall(req, res, next) {
        try {
            const { search } = req.query;
            const cardNameSearch = encodeURIComponent(search);
            
            const { data } = await axios({
                method: "get",
                url: `${scryfallUrl}/cards/search?q=${cardNameSearch}`,
            });

            res.status(200).json(data);
        }
        catch(error) {
            next(error);
        }
    }
}

module.exports = CardCollectionController