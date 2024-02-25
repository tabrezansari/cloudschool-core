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
const UserProfile = models.user_profile;

const UserUpdate = async (req, res, next) => {
  const orgId = req.params.__user_org_id__;
  const userId = req.params.userId;

  UserProfile.update(req.body, { where: { userId: userId } })
    .then((num) => {
      if (num > 0 || num[0] > 0) {
        res.status(200).json(response.success(null, 2013));
      } else {
        res.status(200).json(response.error(res.statusCode, 2014));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 2014));
    });
};

module.exports = UserUpdate;
