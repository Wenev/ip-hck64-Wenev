'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardCollection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CardCollection.belongsToMany(models.Collection);
    }
  }
  CardCollection.init({
    ownedFrom: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          args: true,
          msg: "Owned Date must be a Date."
        },
      },
    },
    purchasePrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: {
          args: true,
          msg: "Purchase Price must be a Number"
        },
      },
    },
    CollectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "CollectionId must not be empty"
        },
        notEmpty: {
          args: true,
          msg: "CollectionId must not be empty"
        },
      },
    },
    CardId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "CardId must not be empty"
        },
        notEmpty: {
          args: true,
          msg: "CardId must not be empty"
        },
      },
    }
  }, {
    sequelize,
    modelName: 'CardCollection',
  });
  return CardCollection;
};