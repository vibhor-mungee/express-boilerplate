"use strict";
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      isVerified: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      },

      pictureUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      contactNo: {
        type: DataTypes.STRING(255),
        allowNull: true
      },     
      bio: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      aboutMe: {
        type: DataTypes.STRING(1234),
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      roleId: { type: DataTypes.INTEGER(11) }
    },
    {}
  );
  // Users.associate = function(models) {
  //   // associations can be defined here
  //   Users.hasMany(models.companyDetails, { foreignKey: "userId" });
  //   Users.belongsToMany(models.InterestMasters, {
  //     through: "UserInterests",
  //     foreignKey: "userId"
  //   });
  //   Users.belongsToMany(models.SkillsMasters, {
  //     foreignKey: "userId",
  //     through: "UserSkills"
  //   });
  //   Users.hasMany(models.UserEducationDetails, { foreignKey: "userId" });
  //   Users.hasMany(models.UserAchievements, { foreignKey: "userId" });
  //   Users.hasMany(models.Answers, { foreignKey: "writtenBy" });
  // };
  return Users;
};
