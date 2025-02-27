const axios = require("axios");
const { scryfallUrl } = require("../URLs.js");
const { CardCollection, Collection } = require("../models");
const { delay } = require("../helpers/delay.js");

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
            await delay(80);

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
            await delay(80);

            res.status(200).json(data);
        }
        catch(error) {
            next(error);
        }
    }
    static async editCardsInCollection(req, res, next) {
        try {
            const { CardId, ownedFrom, purchasePrice } = req.body;

            if(!CardId) {
                throw { name: "InvalidInput", message: "CardId must not be empty" };
            }

            const { data } = await axios({
                method: "get",
                url: `${scryfallUrl}/cards/${CardId}`
            });
            await delay(80);

            const { collectionId, cardCollectionId } = req.params;

            const editCard = await CardCollection.update({
                CardId: CardId,
                ownedFrom: ownedFrom,
                purchasePrice: purchasePrice,
                CollectionId: collectionId
            }, {
                where: {
                    id: cardCollectionId
                }
            });

            res.status(200).json({ message: `Card has been edited` });
        }
        catch(error) {
            next(error);
        }
    }
    static async deleteCardsInCollection(req, res, next) {
        try {
            const { cardCollectionId } = req.params;

            const deleteCard = await CardCollection.destroy({
                where: {
                    id: cardCollectionId
                }
            });

            res.status(200).json({ message: "Card has successfully deleted" });
        }
        catch(error) {
            next(error);
        }
    }
}

module.exports = CardCollectionController