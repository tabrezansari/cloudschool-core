const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user_roles", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
