const moment = require("moment");
const { Sequelize } = require("sequelize");
const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Exams = models.class_exams;

const examList = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  const classId = req.query.class;
  // const year = req.quer.year || moment().format("YYYY");
  Exams.findAll({
    where: { classId: classId },
    // attributes: ["id", "name"],
  })
    .then((data) => {
      if (data) {
        res.status(200).json(response.success(data, 7001));
      } else {
        res.status(200).json(response.error(res.statusCode, 7002));
      }
    })
    .catch((err) => {
      res.status(500).json(response.error(res.statusCode, 7002));
    });
};

module.exports = examList;
