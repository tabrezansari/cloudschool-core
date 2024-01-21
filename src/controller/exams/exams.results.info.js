const moment = require("moment");
const { Sequelize } = require("sequelize");
const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Exams = models.class_exams;
const ExamResults = models.exam_results;
const Users = models.users;

const ExamResultInfo = async (req, res, next) => {
  const { examId, orgId, sId } = req.query;

  Users.findOne({
    where: { sid: sId, userOrganisationId: orgId },
    include: [
      { model: models.user_profile },
      {
        model: models.user_roles,
        where: { role_name: "Student" },
      },
      {
        model: models.exam_participants,
        where: { classExamId: examId },
        include: {
          model: models.exam_results,
          include: {
            model: models.subjects,
          },
        },
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.status(200).json(response.success(data, 7009));
      } else {
        res.status(200).json(response.error(res.statusCode, 7010));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 7010));
    });
};

module.exports = ExamResultInfo;
