const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user_password_reset", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    verification_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
