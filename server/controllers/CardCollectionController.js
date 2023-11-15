const axios = require("axios");
const { scryfallUrl } = require("../URLs.js");
const { CardCollection } = require("../models");

class CardCollectionController {
    static async addCardToCollection(req, res, next) {
        try {
            // const { cardUID } = req.body;
            // const cardData = await axios.get()
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