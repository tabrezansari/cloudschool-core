const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("class_exams", {
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
    marks_type: {
      type: DataTypes.ENUM,
      values: ["GRADE", "NUMBER"],
    },
  });
};
