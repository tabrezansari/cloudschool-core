const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "90d" });
}
module.exports = generateAccessToken;
