const response = require("../../helpers/response");
const crypto = require("crypto");
const moment = require("moment");
//Database Model
const { models } = require("../../models");
const { uuid } = require("uuidv4");
const Users = models.users;
const PasswordResets = models.user_password_reset;

function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}

const sendNewLink = async (req, res, next, userId) => {
  const resetPayload = {
    id: uuid(),
    verification_code: randomTokenString(),
    expiry: moment().add(1, "d").format("YYYY-MM-DD hh:mm:ss"),
    userId: userId,
  };
  PasswordResets.create(resetPayload)
    .then((data) => {
      res.status(200).json(response.success(null, 1010));
    })
    .catch((err) => {
      res.send(err);
      res.status(500).json(response.error(res.statusCode, 1011));
    });
};

const updatePreviousLink = async (req, res, next, userId) => {
  const resetPayload = {
    verification_code: randomTokenString(),
    expiry: moment().add(1, "d").format("YYYY-MM-DD hh:mm:ss"),
  };
  PasswordResets.update(resetPayload, {
    where: { userId: userId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json(response.success(null, 1010));
      } else {
        res.status(422).json(response.error(res.statusCode, 100000));
      }
    })
    .catch((err) => {
      res.status(500).json(response.error(res.statusCode, 1011));
    });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  Users.findOne({
    where: {
      email: email,
    },
    include: [{ model: PasswordResets }],
  })
    .then(async (data) => {
      if (data) {
        const userId = data.dataValues.id;
        if (data.dataValues.user_password_reset === null) {
          sendNewLink(req, res, next, userId);
        } else {
          updatePreviousLink(req, res, next, userId);
        }
      } else {
        res.status(401).json(response.error(res.statusCode, 1011));
      }
    })
    .catch((err) => {
      res.status(422).json(response.error(res.statusCode, 100000));
    });
};

module.exports = forgotPassword;
