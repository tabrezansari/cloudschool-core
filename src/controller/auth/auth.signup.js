const response = require("../../helpers/response");
const bcrypt = require("bcrypt");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
const { uuid } = require("uuidv4");
// const sendEmail = require("../../helpers/communication/email.helper");
const Users = models.users;
const UserInvite = models.user_invites;

const signup = async (req, res, next) => {
  const { email, password, password_confirm } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  if (password === password_confirm) {
    const roleIdFromInvite = await UserInvite.findOne({
      where: {
        email: email,
      },
    }).then((data) => {
      return data?.dataValues?.role_id;
    });
    if (roleIdFromInvite) {
      const userPayload = {
        email: email,
        password: hashedPassword,
        status: ACCOUNT_STATUS_TYPES.ACTIVE,
        role_id: roleIdFromInvite,
        id: uuid(),
      };
      Users.create(userPayload)
        .then(async (data) => {
          UserInvite.destroy({
            where: { email: email },
          }).then((num) => {
            if (num == 1) {
              res.status(200).json(response.success({ email: email }, 1007));
            } else {
              res.status(500).json(response.error(res.statusCode, 1009));
            }
          });
        })
        .catch((err) => {
          res.status(500).json(response.error(res.statusCode, 1009));
        });
    } else {
      res.status(412).json(response.error(res.statusCode, 1003));
    }
  } else {
    res.status(412).json(response.error(res.statusCode, 1008));
  }
};

module.exports = signup;
