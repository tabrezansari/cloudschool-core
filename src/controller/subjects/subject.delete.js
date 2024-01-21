const moment = require("moment");
const { Sequelize } = require("sequelize");
const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Subjects = models.subjects;

const DeleteSubject = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  const subjectId = req.params.subjectId;
  const classId = req.params.classId;

  // const year = req.quer.year || moment().format("YYYY");
  Subjects.destroy({
    where: { id: subjectId, classId: classId },
    // attributes: ["id", "name"],
  })
    .then((num) => {
      if (num > 0 || num[0] > 0) {
        res.status(200).json(response.success(null, 5005));
      } else {
        res.status(200).json(response.error(res.statusCode, 5006));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 5006));
    });
};

module.exports = DeleteSubject;
