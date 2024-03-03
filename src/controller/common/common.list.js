const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const modelMap = {
  USER_ROLES: models.user_roles,
  CLASSES: models.classes,
  SECTIONS: models.class_sections,
  ORGANISATIONS: models.user_organisation,
  EXAMINATION: models.class_exams,
};

const CommonList = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;

  const service = req.query.service;
  const { filterKey, filterValue } = req.query;
  const ServiceModel = modelMap[service];
  const fitlerObj = service === "CLASSES" ? { userOrganisationId: orgId } : {};
  if (filterKey && filterValue) fitlerObj[filterKey] = filterValue;
  if (!service) {
    res.status(401).json(response.error(res.statusCode, 1002));
  } else {
    ServiceModel.findAll(fitlerObj ? { where: fitlerObj } : {})
      .then(async (data) => {
        console.log("class data", data);
        if (data) {
          res.status(200).json(response.success(data, 5007));
        } else {
          res.status(401).json(response.error(res.statusCode, 1002));
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json(response.error(res.statusCode, 1002));
      });
  }
};

module.exports = CommonList;
