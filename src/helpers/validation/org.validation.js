const validator = require(".");

const createOrg = async (req, res, next) => {
  const validationRule = {
    name: "required|string",
  };

  await validator.payloadValidator(req, res, next, validationRule);
};

module.exports = {
  createOrg,
};
