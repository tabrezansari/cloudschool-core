const moment = require("moment");
const { Sequelize } = require("sequelize");
const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Subjects = models.subjects;

const SubjectList = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  const classId = req.query.class;
  // const year = req.quer.year || moment().format("YYYY");
  Subjects.findAll({
    where: { classId: classId },
    include: models.classes,
    // attributes: ["id", "name"],
  })
    .then((data) => {
      if (data) {
        res.status(200).json(response.success(data, 5001));
      } else {
        res.status(200).json(response.error(res.statusCode, 5002));
      }
    })
    .catch((err) => {
      res.status(500).json(response.error(res.statusCode, 5002));
    });
};

module.exports = SubjectList;
