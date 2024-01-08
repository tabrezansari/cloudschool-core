const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Organisation = models.user_organisation;

const organisationInfo = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  Organisation.findOne({
    where: { id: orgId },
  })
    .then((data) => {
      if (data) {
        res.status(200).json(response.success(data, 4001));
      } else {
        res.status(500).json(response.error(res.statusCode, 4002));
      }
    })
    .catch((err) => {
      res.status(500).json(response.error(res.statusCode, 4002));
    });
};

module.exports = organisationInfo;
