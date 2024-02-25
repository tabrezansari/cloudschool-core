const moment = require("moment");
const { Sequelize } = require("sequelize");
const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Exams = models.class_exams;
const ExamResults = models.exam_results;
const Users = models.users;
const ExamParticipants = models.exam_participants;

const ExamResultList = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  const examId = req.params.examId;

  // Users.findAll({
  //   include: [
  //     { model: models.user_profile },
  //     {
  //       model: models.user_roles,
  //       where: { role_name: "Student" },
  //     },
  //     {
  //       model: models.exam_participants,
  //       where: { classExamId: examId },
  //       include: {
  //         model: models.exam_results,
  //         include: {
  //           model: models.subjects,
  //         },
  //       },
  //       raw: true,
  //     },
  //   ],
  // })
  ExamParticipants.findAll({
    where: { classExamId: examId },
    include: { model: models.users, include: models.user_profile },
    attributes: {
      include: [
        [
          // Note the wrapping parentheses in the call below!
          Sequelize.literal(`(
              SELECT SUM(subjects.passing_marks) as passing_marks
            FROM exam_results
            INNER JOIN subjects ON exam_results.subjectId=subjects.id WHERE exam_results.examParticipantId=exam_participants.id
         )`),
          "passing_marks",
        ],
        [
          // Note the wrapping parentheses in the call below!
          Sequelize.literal(`(
            SELECT SUM(marks) FROM exam_results where exam_results.examParticipantId=exam_participants.id
         )`),
          "scored_marks",
        ],
      ],
    },
    where: { classExamId: examId },
  })
    .then((data) => {
      if (data) {
        let finalResults = [];
        data.map((result) => {
          result.dataValues["result"] =
            parseInt(result.dataValues.scored_marks) >
            parseInt(result.dataValues.passing_marks)
              ? "PASS"
              : "FAILED";
          if (result.dataValues.scored_marks) {
            finalResults.push(result);
          }
        });
        res.status(200).json(response.success(finalResults, 7007));
      } else {
        res.status(200).json(response.error(res.statusCode, 7008));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 7008));
    });
};

module.exports = ExamResultList;
