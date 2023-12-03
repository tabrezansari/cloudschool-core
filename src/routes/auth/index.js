const validation = require("../../middlewares/validation");
const authController = require("../../controller/auth");
const authMiddleware = require("../../middlewares/auth");

module.exports = (app) => {
  var router = require("express").Router();

  router.post("/login", validation.auth.login, authController.login);
  router.post(
    "/signup",
    validation.auth.signup,
    authMiddleware.isDuplicateUser,
    authController.signup
  );

  router.post(
    "/password/forgot",
    validation.auth.forgotPassword,
    authController.forgotPassword
  );
  router.post(
    "/password/change",
    validation.auth.changePassword,
    authController.changePassword
  );
  router.post("/resend", validation.auth.resend, authController.resendLink);
  app.use("/api/auth/", router);
};
