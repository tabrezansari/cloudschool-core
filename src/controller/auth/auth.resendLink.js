const response = require("../../helpers/response");
const bcrypt = require("bcrypt");
const tokenization = require("../../helpers/Tokenization");

//Database Model
const db = require("../../models");
const Users = db.users;



const resendLink = async (req, res, next) => {
  const {email} = req.body;
  Users.findOne({
    where: {
      email: email,
    },
  })
    .then(async (data) => {
      const stautsMap={
        ACTIVE:1008,
        DELTETED:1010,
        PENDING:1007
      }
      if (data) {
        res
            .status(200)
            .json(response.success(null, stautsMap[data.dataValues.status]));

      } else {
        res
        .status(401)
        .json(response.error(res.statusCode, 1002));
      }
    })
    .catch((err) => {
      res.status(422).json(response.error(res.statusCode, 100000));
    });
};

module.exports = resendLink;
