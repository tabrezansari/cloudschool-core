const login = require("./auth.login");
const signup = require("./auth.signup");
const resendLink = require("./auth.resendLink");
const forgotPassword = require("./auth.forgot");
const changePassword = require("./auth.change.password");
const verifyInvite = require("./auth.invite_verify");
const InviteUser = require("./auth.invite.user");

module.exports = {
  login: login,
  signup: signup,
  resendLink: resendLink,
  forgotPassword: forgotPassword,
  changePassword: changePassword,
  verifyInvite: verifyInvite,
  InviteUser: InviteUser,
};
