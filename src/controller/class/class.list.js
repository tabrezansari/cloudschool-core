const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Classes = models.classes;

const classList = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  Classes.findAll({
    where: { userOrganisationId: orgId },
  })
    .then((data) => {
      if (data) {
        res.status(200).json(response.success(data, 6001));
      } else {
        res.status(200).json(response.error(res.statusCode, 6002));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 6002));
    });
};

module.exports = classList;
