const AuthCodes = require("./auth.response.code");

let allCodes = {
  ...AuthCodes,
  404: "Could not find resource you are looking for",
};

module.exports = allCodes;
