'use strict';


const {
  Model
} = require('sequelize');
const { hashPass } = require("../helpers/bcrypt.js");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Collection);
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username has already been used"
      },
      validate: {
        notNull: {
          args: true,
          msg: "Username must not be empty"
        },
        notEmpty: {
          args: true,
          msg: "Username must not be empty"
        },
        isAlphanumeric: {
          args: true,
          msg: "Username must only contain letters or numbers"
        }
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "First Name must not be empty"
        },
        notEmpty: {
          args: true,
          msg: "First Name must not be empty"
        },
        isAlpha: {
          args: true,
          msg: "First Name must only contain letters"
        }
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isAlpha: {
          args: true,
          msg: "Last Name must only contain letters"
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email has already been used"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid Email Format"
        },
        notNull: {
          args: true,
          msg: "Email must not be empty"
        },
        notEmpty: {
          args: true,
          msg: "Email must not be empty"
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password must not be empty"
        },
        notEmpty: {
          args: true,
          msg: "Password must not be empty"
        },
        len: {
          args: [8, 100],
          msg: "Password must be 8 characters or longer"
        }
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPass(user.password);
  });
  return User;
};