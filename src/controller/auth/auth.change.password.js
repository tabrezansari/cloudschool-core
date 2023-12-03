const response = require("../../helpers/response");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const moment = require("moment");
//Database Model
const { models } = require("../../models");
const { uuid } = require("uuidv4");
const { Op } = require("sequelize");
const Users = models.users;
const PasswordResets = models.user_password_reset;

const changePassword = async (req, res, next) => {
  const {
    verification_code,
    password,
    password_confirm,
    old_password,
    user_id,
  } = req.body;
  PasswordResets.findOne({
    where: {
      verification_code: verification_code,
      expiry: {
        [Op.gt]: moment().format("YYYY-MM-DD hh:mm:ss"),
      },
    },
  })
    .then(async (data) => {
      if (data) {
        const userId = data.dataValues.userId;
        if (password === password_confirm) {
          const hashedPassword = await bcrypt.hash(password, 10);

          Users.update(
            { password: hashedPassword },
            {
              where: { id: userId },
            }
          )
            .then((num) => {
              if (num == 1) {
                PasswordResets.destroy({ where: { userId: userId } })
                  .then((rowDeleted) => {
                    if (rowDeleted === 1) {
                      res
                        .status(200)
                        .json(response.success(res.statusCode, 1006));
                    } else {
                      res
                        .status(401)
                        .json(response.error(res.statusCode, 100000));
                    }
                  })
                  .catch((err) => {
                    res
                      .status(500)
                      .json(response.error(res.statusCode, 100000));
                  });
              } else {
                res.status(401).json(response.error(res.statusCode, 100000));
              }
            })
            .catch((err) => {
              res.status(401).json(response.error(res.statusCode, 100000));
            });
        } else {
          res.status(401).json(response.error(res.statusCode, 1008));
        }
      } else {
        res.status(200).json(response.error(res.statusCode, 1012));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json(response.error(res.statusCode, 100000));
    });
};

module.exports = changePassword;
