const authValidation = require("../../helpers/validation/auth.validation");
const userValidation = require("../../helpers/validation/user.validation");
const orgValidation = require("../../helpers/validation/org.validation");
const classValidation = require("../../helpers/validation/class.validation");

module.exports = {
  auth: authValidation,
  user: userValidation,
  org: orgValidation,
  class: classValidation,
};
