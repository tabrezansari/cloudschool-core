const validation = require("../../middlewares/validation");
const examController = require("../../controller/exams");
const authMiddleware = require("../../middlewares/auth");

module.exports = (app) => {
  var router = require("express").Router();

  router.post(
    "/create",
    authMiddleware.isTokenValid,
    // validation.class.createClass,
    examController.examCreate
  );

  router.get("/list", authMiddleware.isTokenValid, examController.examList);
  app.use("/api/exams/", router);
};
