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
const User = models.users;
const MoveStudents = async (req, res, next) => {
  const { currentSectionId, nextSectionId } = req.body;
  const orgId = req.params.__user_org_id__;

  User.update(
    { classSectionId: nextSectionId },
    { where: { classSectionId: currentSectionId, userOrganisationId: orgId } }
  )
    .then((num) => {
      if (num > 1) {
        res.status(200).json(response.success(null, 2009));
      } else {
        res.status(200).json(response.error(res.statusCode, 2010));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 2010));
    });
};

module.exports = MoveStudents;
