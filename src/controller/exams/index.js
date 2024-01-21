const examCreate = require("./exams.create");
const examList = require("./exams.list");
const ExamResultInfo = require("./exams.results.info");
const ExamResultList = require("./exams.results.list");
const ExamResultUpload = require("./exams.results.upload");
const updateExam = require("./exams.update");

module.exports = {
  examList: examList,
  examCreate: examCreate,
  updateExam: updateExam,
  ExamResultList: ExamResultList,
  ExamResultUpload: ExamResultUpload,
  ExamResultInfo: ExamResultInfo,
};
