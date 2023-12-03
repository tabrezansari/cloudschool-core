const duplicateUser = require("./duplicateUser");
const hasAccess = require("./hasAccess");
const isTokenValid = require("./isTokenValid");

module.exports = {
  isDuplicateUser: duplicateUser,
  isTokenValid: isTokenValid,
  hasAccess: hasAccess,
};
