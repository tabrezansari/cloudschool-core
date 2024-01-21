const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
// const UserProfile = models.user_profile;
const Classes = models.classes;
const Organisation = models.user_organisation;
function generateToken() {
  const randomNum = Math.random() * 9000;
  return Math.floor(1000 + randomNum);
}

const classCreate = async (req, res, next) => {
  const { name, year } = req.body;
  const orgId = req.params.__user_org_id__;

  const getOrgInfo = await Organisation.findOne({ where: { id: orgId } }).then(
    (data) => {
      return data?.dataValues;
    }
  );
  //generate random password for the account
  const payload = {
    id: uuid(),
    name: name,
    class_code: `${getOrgInfo.short_name}-CL-${generateToken()}`,
    userOrganisationId: orgId,
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
