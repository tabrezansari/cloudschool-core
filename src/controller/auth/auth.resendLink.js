const response = require("../../helpers/response");
const bcrypt = require("bcrypt");
const tokenization = require("../../helpers/Tokenization");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
const Users = models.users;

const resendLink = async (req, res, next) => {
  const { email } = req.body;
  Users.findOne({
    where: {
      email: email,
    },
  })
    .then(async (data) => {
      const plainData = data.get({ plain: true });
      if (data) {
        if (plainData.status === ACCOUNT_STATUS_TYPES.PENDING) {
          res
            .status(200)
            .json(response.success(null, stautsMap[data.dataValues.status]));
        } else {
          res.status(200).json(response.success(null, 1017));
        }
      } else {
        res.status(401).json(response.error(res.statusCode, 1002));
      }
    })
    .catch((err) => {
      res.status(422).json(response.error(res.statusCode, 1002));
    });
};

module.exports = resendLink;
