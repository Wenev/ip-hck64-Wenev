'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("CardCollections", "CardId", {
      type: Sequelize.UUID,
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  },
  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn("CardCollections", "CardId")
  }
};
