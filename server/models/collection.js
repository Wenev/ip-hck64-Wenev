'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Collection.belongsTo(models.User);
      Collection.hasMany(models.CardCollection, {as: "Cards"});
    }
  }
  Collection.init({
    collectionName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Collection Name must not be empty"
        },
        notEmpty: {
          args: true,
          msg: "Collection Name must not be empty"
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "UserId must not be empty"
        },
        notEmpty: {
          args: true,
          msg: "UserId must not be empty"
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};