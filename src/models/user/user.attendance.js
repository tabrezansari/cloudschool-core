const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user_attendance", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_present: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["YES", "NO"],
    },
  });
};
