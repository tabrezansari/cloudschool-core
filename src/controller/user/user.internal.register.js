const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
// const UserProfile = models.user_profile;
const User = models.users;

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
const InternalUserRegister = async (req, res, next) => {
  const { users } = req.body;
  //generate random password for the account
  await Promise.all(
    users.map(async (user) => {
      user.id = uuid();
      user.verify_token = null;
      user.status = ACCOUNT_STATUS_TYPES.ACTIVE;
      user.password = await bcrypt.hash(generatePassword(), 10);
    })
  );

  console.log(users);
  User.bulkCreate(users)
    .then((data) => {
      res.status(200).json(response.success(data, 2005));
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(response.error(res.statusCode, 2006));
    });
};

module.exports = InternalUserRegister;
