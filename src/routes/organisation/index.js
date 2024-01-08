const validation = require("../../middlewares/validation");
const orgController = require("../../controller/organisation");
const authMiddleware = require("../../middlewares/auth");

module.exports = (app) => {
  var router = require("express").Router();

  router.get(
    "/info",
    authMiddleware.isTokenValid,
    orgController.organisationInfo
  );
  router.post(
    "/create",
    authMiddleware.isTokenValid,
    validation.org.createOrg,
    orgController.organisationCreate
  );

  router.get(
    "/users",
    authMiddleware.isTokenValid,
    orgController.organisationUsers
  );
  app.use("/api/organisation/", router);
};
