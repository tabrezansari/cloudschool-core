const moment = require("moment");
const { Sequelize } = require("sequelize");
const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Users = models.users;
const Attendance = models.user_attendance;

const ClassAttendanceView = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  const year = req.query.year || moment().format("YYYY");
  const { sectionId, subjectId } = req.params;
  Users.findAll({
    where: {
      userOrganisationId: orgId,
      classSectionId: sectionId,
      ...(subjectId ? { subjectId: subjectId } : {}),
    },
    include: [
      {
        model: models.user_attendance,
      },
      {
        model: models.user_profile,
      },
    ],
    // attributes: ["id", "name"],
  })
    .then((data) => {
      if (data) {
        res.status(200).json(response.success(data, 6001));
      } else {
        res.status(200).json(response.error(res.statusCode, 6002));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 6002));
    });
};

module.exports = ClassAttendanceView;
