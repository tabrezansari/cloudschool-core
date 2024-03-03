const moment = require("moment");
const { Sequelize } = require("sequelize");
const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Users = models.users;
const Exams = models.class_exams;
const ExamParticipants = models.exam_participants;

const generateInsight = (userList, examList, resultList) => {
  let response = {
    staff: 0,
    students: 0,
    exams: 0,
    failed_student: 0,
    passed_student: 0,
  };

  userList.forEach((user) => {
    if (user.user_role?.role_name === "Student") response.students += 1;
    if (user.user_role?.role_name === "Staff") response.staff += 1;
  });

  response.exams = examList.length;

  resultList.forEach((result) => {
    if (result.dataValues.scored_marks > result.dataValues.passing_marks) {
      response.passed_student += 1;
    } else {
      response.failed_student += 1;
    }
  });

  return response;
};
const DashboardGist = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  const year = req.query.year || moment().format("YYYY");
  try {
    const userList = await Users.findAll({
      include: models.user_roles,
      where: { userOrganisationId: orgId },
    }).then((data) => {
      return data;
    });
    const examList = await Exams.findAll({
      include: { model: models.classes, where: { userOrganisationId: orgId } },
      where: { year: moment().format("YYYY") },
    }).then((data) => {
      return data;
    });

    const examResults = await ExamParticipants.findAll({
      include: { model: models.users, where: { userOrganisationId: orgId } },
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
    }).then((data) => {
      return data;
    });
    const resultResponse = await generateInsight(
      userList,
      examList,
      examResults
    );
    res.status(200).json(response.success(resultResponse, 5001));
  } catch (error) {
    console.log(error);
    res.status(500).json(response.error(res.statusCode, 5002));
  }
};

module.exports = DashboardGist;
