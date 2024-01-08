const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user_profile", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["MALE", "FEMALE", "OTHERS"],
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
