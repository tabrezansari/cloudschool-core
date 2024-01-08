const validator = require("../validation");

const login = async (req, res, next) => {
  const validationRule = {
    email: "required|email",
    password: "required|string|min:6",
  };

  await validator.payloadValidator(req, res, next, validationRule);
};

const signup = async (req, res, next) => {
  const validationRule = {
    email: "required|email",
    password: "required|string|min:6",
    password_confirm: "required|string|min:6",
  };

  await validator.payloadValidator(req, res, next, validationRule);
};

const resend = async (req, res, next) => {
  const validationRule = {
    email: "required|email",
  };

  await validator.payloadValidator(req, res, next, validationRule);
};

const forgotPassword = async (req, res, next) => {
  const validationRule = {
    email: "required|email",
  };

  await validator.payloadValidator(req, res, next, validationRule);
};

const changePassword = async (req, res, next) => {
  const validationRule = {
    verification_code: "string",
    password: "required|string|min:6",
    password_confirm: "required|string|min:6",
    old_password: "string|min:6",
  };

  await validator.payloadValidator(req, res, next, validationRule);
};

const userInvite = async (req, res, next) => {
  const validationRule = {
    members: "required|array",
  };

  await validator.payloadValidator(req, res, next, validationRule);
};

module.exports = {
  signup,
  login,
  resend,
  forgotPassword,
  changePassword,
  userInvite,
};
