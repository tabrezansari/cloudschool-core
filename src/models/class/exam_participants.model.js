const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("exam_participants", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });
};
