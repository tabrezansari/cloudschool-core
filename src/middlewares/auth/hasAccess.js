const response = require("../../helpers/response");
require("dotenv").config();
const { models } = require("../../models");
const ModuleFeatures = models.module_features;

module.exports = function hasAccess(featureKey) {
  return async (req, res, next) => {
    const roleId = req.params.user_role_id;
    ModuleFeatures.findOne({
      include: [{ model: models.feature_roles, where: { userRoleId: roleId } }],
      where: {
        feature_key: featureKey,
      },
    })
      .then(async (data) => {
        if (data) {
          next();
        } else {
          res.status(401).json(response.error(null, 6006));
        }
      })
      .catch((err) => {
        res.status(401).json(response.error(null, 6006));
      });
  };
};
