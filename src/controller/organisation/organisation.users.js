const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Users = models.users;

const organisationUsers = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  Users.findAll({
    where: { userOrganisationId: orgId },
    include: models.user_profile,
  })
    .then((data) => {
      if (data) {
        res.status(200).json(response.success(data, 4005));
      } else {
        res.status(500).json(response.error(res.statusCode, 4006));
      }
    })
    .catch((err) => {
      res.status(500).json(response.error(res.statusCode, 4006));
    });
};

module.exports = organisationUsers;
