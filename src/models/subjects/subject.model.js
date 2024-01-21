const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("subjects", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    total_marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    passing_marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
