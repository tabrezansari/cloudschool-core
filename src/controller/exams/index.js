const examCreate = require("./exams.create");
const examList = require("./exams.list");
const updateExam = require("./exams.update");

module.exports = {
  examList: examList,
  examCreate: examCreate,
  updateExam: updateExam,
};
