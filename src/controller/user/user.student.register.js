const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
const sendEmail = require("../../helpers/communication/email.helper");
// const UserProfile = models.user_profile;
const User = models.users;
const UserRoles = models.user_roles;
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
const RegisterStudents = async (req, res, next) => {
  const { students } = req.body;
  const orgId = req.params.__user_org_id__;

  const Studentrole = await UserRoles.findOne({
    where: {
      role_name: "Student",
    },
  }).then((data) => {
    return data.dataValues;
  });

  let profilePayload = [];
  //generate random password for the account
  await Promise.all(
    students.map(async (student) => {
      let password = generatePassword();
      let userNewId = uuid();
      student.id = userNewId;
      student.verify_token = null;
      student.status = ACCOUNT_STATUS_TYPES.ACTIVE;
      student.password = await bcrypt.hash(password, 10);
      student.userRoleId = Studentrole.id;
      student.userOrganisationId = orgId;
      student.realPass = password;
      profilePayload.push({
        first_name: student.first_name,
        last_name: student.last_name,
        id: uuid(),
        userId: userNewId,
      });
    })
  );
  User.bulkCreate(students)
    .then((data) => {
      UserProfile.bulkCreate(profilePayload)
        .then((newData) => {
          students.forEach(async (userData) => {
            await Promise.all(
              students.map(async (student) => {
                await sendEmail(student.email, "STUDENT_INVITE", {
                  name: student.first_name,
                  temp_password: student.realPass,
                });
              })
            );
          });
          res.status(200).json(response.success(null, 2005));
        })
        .catch((err) => {
          console.log(err);

          res.status(401).json(response.error(res.statusCode, 2006));
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(response.error(res.statusCode, 2006));
    });
};

module.exports = RegisterStudents;
