const response = require("../../helpers/response");
const bcrypt = require("bcrypt");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
const { uuid } = require("uuidv4");
const Tokenization = require("../../helpers/Tokenization");
// const sendEmail = require("../../helpers/communication/email.helper");
const Users = models.users;
const UserInvite = models.user_invites;

const signup = async (req, res, next) => {
  const { email, password, password_confirm, SID } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  if (password === password_confirm) {
    const userInviteInfo = await UserInvite.findOne({
      where: {
        email: email,
      },
    }).then((data) => {
      return data;
    });
    console.log(userInviteInfo);
    if (userInviteInfo) {
      const userPayload = {
        email: email,
        password: hashedPassword,
        status: ACCOUNT_STATUS_TYPES.ACTIVE,
        userRoleId: userInviteInfo.role_id,
        id: uuid(),
        userOrganisationId: userInviteInfo.userOrganisationId,
        sid: SID,
      };
      Users.create(userPayload)
        .then(async (data) => {
          UserInvite.destroy({
            where: { email: email },
          }).then((num) => {
            if (num == 1) {
              const accessToken = Tokenization.generateToken({
                sub: email,
                sub_id: data.dataValues.id,
                role_id: data.dataValues.role_id,
                org_id: data.dataValues.userOrganisationId,
              });
              res
                .status(200)
                .json(
                  response.success(
                    { email: email, accessToken: accessToken },
                    1007
                  )
                );
            } else {
              res.status(500).json(response.error(res.statusCode, 1009));
            }
          });
        })
        .catch((err) => {
          console.log(err);
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
