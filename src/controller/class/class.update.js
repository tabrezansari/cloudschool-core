const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
// const UserProfile = models.user_profile;
const Classes = models.classes;

const classUpdate = async (req, res, next) => {
  const { name } = req.body;
  const classId = req.params.classId;
  //generate random password for the account

  Classes.update({ name: name }, { where: { id: classId } })
    .then((num) => {
      if (num > 0 || num[0] > 0) {
        res.status(200).json(response.success(null, 6007));
      } else {
        res.status(200).json(response.error(null, 6008));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(response.error(res.statusCode, 6008));
    });
};

module.exports = classUpdate;
