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
      { model: models.user_organisation },
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
    .then(async (data) => {
      if (data) {
        let objectData = data.get({ plain: true });
        const allResults = await models.exam_participants.findAll({
          where: { classExamId: examId },
          include: {
            model: models.exam_results,
            attributes: [
              [Sequelize.fn("SUM", Sequelize.col("marks")), "totalMarks"], // Summing marks
            ],
          },
          group: ["exam_participants.id"], // Group by each participant
          order: [[Sequelize.fn("SUM", Sequelize.col("marks")), "DESC"]], // Order by the sum of marks without alias
        });

        // Assign rank based on ordered totalMarks
        let rank = 1;
        let previousMarks = null;
        const resultsWithRank = allResults.map((participant, index) => {
          const currentMarks = parseFloat(
            participant.exam_results[0].dataValues.totalMarks
          );

          // If the current marks are less than previous marks, increment rank
          if (previousMarks !== null && currentMarks < previousMarks) {
            rank = index + 1; // This ensures students with the same marks get the same rank
          }

          previousMarks = currentMarks;

          // Attach rank to the participant result
          return {
            ...participant.toJSON(),
            rank: rank,
          };
        });

        const studentRankData = resultsWithRank.find(
          (participant) => participant.userId === data.id
        );

        res
          .status(200)
          .json(
            response.success(
              { ...objectData, rank: studentRankData?.rank },
              7009
            )
          );
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
