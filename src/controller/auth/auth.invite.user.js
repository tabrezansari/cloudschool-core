const response = require("../../helpers/response");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
const { uuid } = require("uuidv4");
// const sendEmail = require("../../helpers/communication/email.helper");
const UserInvite = models.user_invites;

function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}

const InviteUser = async (req, res, next) => {
  const { members } = req.body;
  members.map((member) => {
    member.id = uuid();
    member.invite_id = randomTokenString();
  });
  UserInvite.bulkCreate(members)
    .then(async (data) => {
      if (data) {
        res.status(200).json(response.success(null, 1013));
      } else {
        res.status(500).json(response.error(res.statusCode, 1014));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 1014));
    });
};

module.exports = InviteUser;
