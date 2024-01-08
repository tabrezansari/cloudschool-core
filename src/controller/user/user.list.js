const response = require("../../helpers/response");
const bcrypt = require("bcrypt");
const tokenization = require("../../helpers/Tokenization");

//Database Model
const { models } = require("../../models");
const Users = models.users;

const UserList = async (req, res, next) => {
  const type = req.query.type || "All";
  Users.findAll({
    include: [
      { model: models.user_profile },
      {
        model: models.user_roles,
        where: type === "All" ? {} : { role_name: type },
      },
      { model: models.class_sections, include: models.classes },
    ],
  })
    .then(async (data) => {
      res.status(200).json(response.success(data, 2003));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 2004));
    });
};

module.exports = UserList;
