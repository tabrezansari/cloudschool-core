const validation = require("../../middlewares/validation");
const userController = require("../../controller/user");
const authMiddleware = require("../../middlewares/auth");

module.exports = (app) => {
  var router = require("express").Router();

  router.get("/list", authMiddleware.isTokenValid, userController.UserList);
  router.post(
    "/create",
    authMiddleware.isTokenValid,
    // validation.user.createuser,
    userController.InternalUserRegister
  );

  router.get(
    "/:otherUserId",
    authMiddleware.isTokenValid,
    userController.getProfile
  );

  router.post(
    "/createstudent",
    authMiddleware.isTokenValid,
    validation.user.createStudents,
    userController.RegisterStudents
  );

  router.post(
    "/students/move",
    authMiddleware.isTokenValid,
    validation.user.moveStudents,
    userController.MoveStudents
  );

  router.post(
    "/:userId/status/:statusKey",
    authMiddleware.isTokenValid,
    userController.UpdateUserStatus
  );

  app.use("/api/user/", router);
};
