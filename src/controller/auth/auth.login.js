const response = require("../../helpers/response");
const bcrypt = require("bcrypt");
const tokenization = require("../../helpers/Tokenization");

//Database Model
const { models } = require("../../models");
const Users = models.users;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  Users.findOne({
    where: {
      email: email,
    },
    attributes: [
      "email",
      "password",
      "userRoleId",
      "id",
      "userOrganisationId",
      "status",
    ],
    include: [{ model: models.user_profile }],
  })
    .then(async (data) => {
      if (data) {
        if (data.status === "DISABLED" || data.status === "DELETED") {
          res.status(401).json(response.error(res.statusCode, 1016));
        } else {
          if (await bcrypt.compare(password, data.password)) {
            const accessToken = tokenization.generateToken({
              sub: email,
              sub_id: data.dataValues.id,
              role_id: data.dataValues.role_id,
              org_id: data.dataValues.userOrganisationId,
            });
            res.status(200).json(
              response.success(
                {
                  accessToken: accessToken,
                  email: email,
                },
                1001
              )
            );
          } else {
            res.status(401).json(response.error(res.statusCode, 1002));
          }
        }
      } else {
        res.status(401).json(response.error(res.statusCode, 1002));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(response.error(res.statusCode, 1002));
    });
};

module.exports = login;
