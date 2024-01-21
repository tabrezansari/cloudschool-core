const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");
const moment = require("moment");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
// const UserProfile = models.user_profile;
const Subjects = models.subjects;
const Students = models.users;
const ExamParticipant = models.exam_participants;
const ExamResults = models.exam_results;

function generateToken() {
  const randomNum = Math.random() * 9000;
  return Math.floor(1000 + randomNum);
}

const getUserIdBySID = async (sid, examId) => {
  return Students.findOne({
    where: { sid: sid },
    include: {
      model: models.exam_participants,
      where: { classExamId: examId },
    },
  }).then((data) => data?.exam_participants?.[0]?.id || false);
};
const ExamResultUpload = async (req, res, next) => {
  const { results, subjects, classId } = req.body;
  const orgId = req.params.__user_org_id__;
  const examId = req.params.examId;
  const subjectList = await Subjects.findAll({
    where: { code: subjects, classId: classId },
  }).then((data) => {
    return data;
  });

  let subjectMap = {};
  subjectList.forEach((element) => {
    subjectMap[element["code"]] = element.id;
  });

  try {
    await Promise.all(
      results.map(async (result) => {
        result.examParticipantId = await getUserIdBySID(result.sid, examId);
        result.id = uuid();
        result.subjectId = subjectMap[result.code];
        result.classExamId = examId;
      })
    );
  } catch (error) {
    res.status(500).json(response.error(res.statusCode, 7012));
  }
  ExamResults.bulkCreate(results)
    .then((data) => {
      res.status(200).json(response.success(data, 7011));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 7012));
    });
};

module.exports = ExamResultUpload;
