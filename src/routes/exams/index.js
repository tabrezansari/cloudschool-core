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

  router.post(
    "/:examId/result/upload",
    authMiddleware.isTokenValid,
    // validation.class.createClass,
    examController.ExamResultUpload
  );

  router.put(
    "/:id/status/:statusId",
    authMiddleware.isTokenValid,
    // validation.class.createClass,
    examController.updateExam
  );
  router.get(
    "/:examId/results",
    authMiddleware.isTokenValid,
    examController.ExamResultList
  );

  router.get("/result/info", examController.ExamResultInfo);

  router.get("/list", authMiddleware.isTokenValid, examController.examList);
  app.use("/api/exams/", router);
};
