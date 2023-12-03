const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user_invites", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
