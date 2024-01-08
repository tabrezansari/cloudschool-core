const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
// const UserProfile = models.user_profile;
const Organisation = models.user_organisation;

const organisationCreate = async (req, res, next) => {
  const { name, estd, address } = req.body;
  //generate random password for the account
  const payload = {
    id: uuid(),
    name: name,
    estd: estd,
    address: address,
  };
  Organisation.create(payload)
    .then((data) => {
      res.status(200).json(response.success(data, 4003));
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(response.error(res.statusCode, 4004));
    });
};

module.exports = organisationCreate;
