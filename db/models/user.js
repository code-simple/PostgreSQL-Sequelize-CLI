"use strict";
const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../../config/database");
module.exports = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM("0", "1", "2"),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(val) {
        if (val === this.password) {
          const hashPassword = bcrypt.hashSync(val, 10);
          this.setDataValue("password", hashPassword);
        } else {
          throw new Error("Passwords do not match");
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true, // Only works if deletedAt is present there
    freezeTableName: true,
    modelName: "user",
  }
);
