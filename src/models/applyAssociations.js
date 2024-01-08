const classAssociations = require("../modelAssociations/class.associations");
const userAssociations = require("../modelAssociations/user.associations");

function applyAssociations(sequelize) {
  userAssociations(sequelize);
  classAssociations(sequelize);
}

module.exports = { applyAssociations };
