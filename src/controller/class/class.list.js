const moment = require("moment");
const { Sequelize } = require("sequelize");
const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Classes = models.classes;

const classList = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  const year = req.query.year || moment().format("YYYY");
  Classes.findAll({
    where: { userOrganisationId: orgId, year: year },
    include: [
      {
        model: models.class_sections,
        attributes: [
          "id",
          "name",
          // [Sequelize.fn("COUNT", Sequelize.col("users")), "counteduser"],
        ],

        include: [
          {
            model: models.users,
          },
        ],
      },
    ],
    // attributes: ["id", "name"],
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
