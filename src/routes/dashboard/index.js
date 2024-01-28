const validation = require("../../middlewares/validation");
const dashboardController = require("../../controller/dashboard");
const authMiddleware = require("../../middlewares/auth");

module.exports = (app) => {
  var router = require("express").Router();

  router.get(
    "/gist",
    authMiddleware.isTokenValid,
    dashboardController.DashboardGist
  );
  router.get(
    "/admission_flow",
    authMiddleware.isTokenValid,
    dashboardController.DashboardAdmissionFlow
  );

  app.use("/api/dashboard/", router);
};
