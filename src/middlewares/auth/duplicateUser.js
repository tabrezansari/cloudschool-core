const { models } = require("../../models");
const response = require("../../helpers/response");
const Users = models.users;

module.exports = async function isDuplicateUser(req, res, next) {
  const { email } = req.body;
  Users.findOne({
    where: {
      email: email,
    },
  }).then(async (data) => {
    if (data) {
      res.status(422).json(response.error(res.statusCode, 1004));
    } else {
      next();
    }
  });
};
