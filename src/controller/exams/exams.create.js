const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");
const moment = require("moment");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
// const UserProfile = models.user_profile;
const Exams = models.class_exams;

const examCreate = async (req, res, next) => {
  const { name, marks_type, classId } = req.body;
  //generate random password for the account
  const payload = {
    id: uuid(),
    name: name,
    year: moment().format("YYYY"),
    marks_type: marks_type,
    classId: classId,
  };
  Exams.create(payload)
    .then((data) => {
      res.status(200).json(response.success(data, 7003));
    })
    .catch((err) => {
      res.status(401).json(response.error(res.statusCode, 7004));
    });
};

module.exports = examCreate;
