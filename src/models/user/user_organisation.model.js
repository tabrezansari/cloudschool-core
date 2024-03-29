const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user_organisation", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estd: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    short_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whitelist_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
