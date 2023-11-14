'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "lastName", {
      type: Sequelize.STRING,
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "lastName");
  }
};
