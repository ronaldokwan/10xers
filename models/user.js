"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "email should not be null",
          },
          notEmpty: {
            msg: "email should not be empty",
          },
          isEmail: {
            msg: "Email format is not correct",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password should not be null",
          },
          notEmpty: {
            msg: "password should not be empty",
          },
          len: {
            args: [4, 20],
            msg: "Password length should be between 4 and 20 characters",
          },
        },
      },
      role: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: "role should not be null",
          },
          notEmpty: {
            msg: "role should not be empty",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          let salt = bcrypt.genSaltSync(5);
          let hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
