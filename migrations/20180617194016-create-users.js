"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      googleId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      facebookId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "RoleMasters",
          key: "id"
        }
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
          notEmpty: true
        }
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      pictureUrl: {
        type: Sequelize.STRING,
        defaultValue: null,
        validate: {
          isUrl: true
        }
      },
      contactNo: {
        type: Sequelize.STRING,
        defaultValue: null,
        validate: {
          len: [10, 15]
        }
      },
      bio: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      aboutMe: {
        type: Sequelize.STRING(1234),
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
