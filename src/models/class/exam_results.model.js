const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("exam_results", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
