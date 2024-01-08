const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
// const UserProfile = models.user_profile;
const ClassSection = models.class_sections;

const classSectionCreate = async (req, res, next) => {
  const { name } = req.body;
  const classId = req.params.classId;
  //generate random password for the account
  const payload = {
    id: uuid(),
    name: name,
    classId: classId,
  };
  ClassSection.create(payload)
    .then((data) => {
      res.status(200).json(response.success(data, 6005));
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(response.error(res.statusCode, 6006));
    });
};

module.exports = classSectionCreate;
