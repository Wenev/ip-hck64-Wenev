'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("CardCollections", "CollectionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Collections",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("CardCollections", "CollectionId")
  }
};
