const AuthCodes = require("./auth.response.code");
const ProfileCodes = require("./profile.response.code");
const organisationCodes = require("./organisation.response.code");
const classCodes = require("./class.response.code");

let allCodes = {
  ...AuthCodes,
  ...ProfileCodes,
  ...organisationCodes,
  ...classCodes,
  404: "Could not find resource you are looking for",
};

module.exports = allCodes;
