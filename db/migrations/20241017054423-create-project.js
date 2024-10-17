"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "project",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isFeatured: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        productImage: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false,
        },
        shortDescription: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        productUrl: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        category: {
          type: Sequelize.ARRAY(Sequelize.STRING),
        },
        tags: {
          type: Sequelize.ARRAY(Sequelize.STRING),
        },
        createdBy: {
          type: Sequelize.INTEGER,
          references: {
            model: "user",
            key: "id",
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        paranoid: true, // Only works if deletedAt is present there
        freezeTableName: true,
        modelName: "project",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("project");
  },
};
