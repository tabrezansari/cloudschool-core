const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Invite = models.user_invites;

const verifyInvite = async (req, res, next) => {
  const { invite } = req.query;
  Invite.findOne({
    where: {
      invite_id: invite,
    },
  })
    .then(async (data) => {
      if (data) {
        res.status(200).json(response.success(data, 1015));
      } else {
        res.status(401).json(response.error(res.statusCode, 1003));
      }
    })
    .catch((err) => {
      res.status(422).json(response.error(res.statusCode, 1003));
    });
};

module.exports = verifyInvite;
