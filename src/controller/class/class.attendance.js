const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
// const UserProfile = models.user_profile;
const Attendance = models.user_attendance;
const Organisation = models.user_organisation;
function generateToken() {
  const randomNum = Math.random() * 9000;
  return Math.floor(1000 + randomNum);
}

const MarkAttendance = async (req, res, next) => {
  const { name, year } = req.body;
  const { classId, sectionId, subjectId } = req.params;
  //generate random password for the account
  let payload = [];
  req.body.attendance.forEach((element) => {
    payload.push({
      id: uuid(),
      date: req.body.date,
      is_present: element.is_present ? "YES" : "NO",
      userId: element.id,
      subjectId: subjectId,
      classSectionId: sectionId,
    });
  });
  Attendance.bulkCreate(payload)
    .then((data) => {
      res.status(200).json(response.success(data, 6003));
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(response.error(res.statusCode, 6004));
    });
};

module.exports = MarkAttendance;
