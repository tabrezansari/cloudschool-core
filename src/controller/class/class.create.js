const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
// const UserProfile = models.user_profile;
const Classes = models.classes;

const classCreate = async (req, res, next) => {
  const { name, userOrganisationId, year } = req.body;
  //generate random password for the account
  const payload = {
    id: uuid(),
    name: name,
    userOrganisationId: userOrganisationId,
    year: year,
  };
  Classes.create(payload)
    .then((data) => {
      res.status(200).json(response.success(data, 6003));
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(response.error(res.statusCode, 6004));
    });
};

module.exports = classCreate;
