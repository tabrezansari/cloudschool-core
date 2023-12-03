const userAssociations = require("../modelAssociations/user.associations");

function applyAssociations(sequelize) {
  userAssociations(sequelize);
}

module.exports = { applyAssociations };
