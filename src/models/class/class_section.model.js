const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("class_sections", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
