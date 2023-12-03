const login = require("./auth.login");
const signup = require("./auth.signup");
const resendLink = require("./auth.resendLink");
const forgotPassword = require("./auth.forgot");
const changePassword = require("./auth.change.password");

module.exports = {
  login: login,
  signup: signup,
  resendLink: resendLink,
  forgotPassword: forgotPassword,
  changePassword: changePassword,
};
