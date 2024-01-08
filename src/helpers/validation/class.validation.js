const validator = require(".");

const createClass = async (req, res, next) => {
  const validationRule = {
    name: "required|string",
    year: "required",
  };

  await validator.payloadValidator(req, res, next, validationRule);
};

const createClassSection = async (req, res, next) => {
  const validationRule = {
    name: "required|string",
  };

  await validator.payloadValidator(req, res, next, validationRule);
};

module.exports = {
  createClass,
  createClassSection,
};
