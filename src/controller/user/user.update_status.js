const response = require("../../helpers/response");
const sharp = require("sharp");
const crypto = require("crypto");
const moment = require("moment");

function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}

//Database Model
const { models } = require("../../models");
const { uuid } = require("uuidv4");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
const User = models.users;
const UpdateUserStatus = async (req, res, next) => {
  const { statusKey, userId } = req.params;

  const statusPayload = {
    status: ACCOUNT_STATUS_TYPES[statusKey],
  };
  User.update(statusPayload, { where: { id: userId } })
    .then((num) => {
      if (num == 1) {
        res.status(200).json(response.success(null, 2007));
      } else {
        res.status(200).json(response.error(res.statusCode, 2008));
      }
    })
    .catch((err) => {
      res.status(500).json(response.error(res.statusCode, 2008));
    });
};

module.exports = UpdateUserStatus;
