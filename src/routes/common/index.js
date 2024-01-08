const validation = require("../../middlewares/validation");
const userController = require("../../controller/user");
const authMiddleware = require("../../middlewares/auth");
const commonController = require("../../controller/common");

module.exports = (app) => {
  var router = require("express").Router();

  router.get("/list", authMiddleware.isTokenValid, commonController.CommonList);

  app.use("/api/common/", router);
};
