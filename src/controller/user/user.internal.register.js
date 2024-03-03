const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
const sendEmail = require("../../helpers/communication/email.helper");
// const UserProfile = models.user_profile;
const User = models.users;
const UserRole = models.user_roles;
const UserProfile = models.user_profile;

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
  const orgId = req.params.__user_org_id__;

  //generate random password for the account
  let profilePayload = [];

  const getStaffRole = await UserRole.findOne({
    where: { role_name: "Staff" },
  }).then((data) => {
    return data;
  });
  await Promise.all(
    users.map(async (user) => {
      let password = generatePassword();
      let userNewId = uuid();

      user.id = userNewId;
      user.verify_token = null;
      user.status = ACCOUNT_STATUS_TYPES.ACTIVE;
      user.password = await bcrypt.hash(password, 10);
      user.sid = user.sid || "STAFF";
      user.realPass = password;
      user.userRoleId = getStaffRole.id;
      user.userOrganisationId = orgId;
      profilePayload.push({
        first_name: user.name,
        last_name: "",
        id: uuid(),
        userId: userNewId,
        mobile: user.mobile,
      });
    })
  );

  console.log(users);
  User.bulkCreate(users)
    .then(async (data) => {
      UserProfile.bulkCreate(profilePayload).then((newData) => {
        users.forEach(async (userData) => {
          await Promise.all(
            users.map(async (student) => {
              await sendEmail(student.email, "STUDENT_INVITE", {
                name: student.name,
                temp_password: student.realPass,
              });
            })
          );
        });
        res.status(200).json(response.success(null, 2005));
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(response.error(res.statusCode, 2006));
    });
};

module.exports = InternalUserRegister;
