const validator = require(".");

const createuser = async (req, res, next) => {
  const validationRule = {
    users: "required|email",
    role: "required|string",
  };

  await validator.payloadValidator(req, res, next, validationRule);
};

const createStudents = async (req, res, next) => {
  const validationRule = {
    students: "required|array",
  };

  await validator.payloadValidator(req, res, next, validationRule);
};

module.exports = {
  createuser,
  createStudents,
};
