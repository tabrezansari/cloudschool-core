const validation = require("../../middlewares/validation");
const subjectController = require("../../controller/subjects");
const authMiddleware = require("../../middlewares/auth");

module.exports = (app) => {
  var router = require("express").Router();

  router.post(
    "/create",
    authMiddleware.isTokenValid,
    // validation.class.createClass,
    subjectController.SubjectCreate
  );

  router.put(
    "/:classId/:subjectId",
    authMiddleware.isTokenValid,
    // validation.class.createClass,
    subjectController.DeleteSubject
  );

  router.get(
    "/list",
    authMiddleware.isTokenValid,
    subjectController.SubjectList
  );
  app.use("/api/subjects/", router);
};
