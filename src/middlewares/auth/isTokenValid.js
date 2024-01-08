const response = require("../../helpers/response");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function isTokenValid(req, res, next) {
  const bearerToken = req.header("Authorization");
  let token = "";
  if (bearerToken && bearerToken.startsWith("Bearer ")) {
    token = bearerToken.substring(7, bearerToken.length);
  } else {
    res.status(401).json(response.error(res.statusCode, 1006));
  }
  if (!token) {
    res.status(401).json(response.error(res.statusCode, 1006));
  } else {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.body.user_id = decoded.sub_id;
      req.params.user_id = decoded.sub_id;
      req.params.user_role_id = decoded.role_id;
      req.params.__user_org_id__ = decoded.org_id;

      next();
    } catch (error) {
      res.status(401).json(response.error(res.statusCode, 1006));
    }
  }
};
