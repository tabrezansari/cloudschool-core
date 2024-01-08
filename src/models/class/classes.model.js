const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("classes", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
