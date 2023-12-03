const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("users", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auto_assign_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    oauth_provider: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    oauth_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verify_token: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["ACTIVE", "PENDING", "DELETED"],
    },
  });
};
