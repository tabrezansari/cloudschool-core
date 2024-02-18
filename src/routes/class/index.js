const validation = require("../../middlewares/validation");
const classController = require("../../controller/class");
const authMiddleware = require("../../middlewares/auth");

module.exports = (app) => {
  var router = require("express").Router();

  router.post(
    "/create",
    authMiddleware.isTokenValid,
    validation.class.createClass,
    classController.classCreate
  );

  router.post(
    "/:classId/section/create",
    authMiddleware.isTokenValid,
    validation.class.createClassSection,
    classController.classSectionCreate
  );

  router.put(
    "/:classId",
    authMiddleware.isTokenValid,
    classController.classUpdate
  );

  router.get("/list", authMiddleware.isTokenValid, classController.classList);
  app.use("/api/class/", router);
};
