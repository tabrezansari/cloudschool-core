const moment = require("moment");
const { Sequelize } = require("sequelize");
const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Exams = models.class_exams;

const updateExam = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  const statusId = req.params.statusId;
  const examId = req.params.id;

  // const year = req.quer.year || moment().format("YYYY");
  Exams.update(
    { status: statusId },
    {
      where: { id: examId },
      // attributes: ["id", "name"],
    }
  )
    .then((num) => {
      if (num > 0 || num[0] > 0) {
        res.status(200).json(response.success(null, 7005));
      } else {
        res.status(200).json(response.error(res.statusCode, 7006));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 7006));
    });
};

module.exports = updateExam;
