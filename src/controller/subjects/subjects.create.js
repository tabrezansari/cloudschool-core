const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");
const moment = require("moment");
function generateToken() {
  const randomNum = Math.random() * 9000;
  return Math.floor(1000 + randomNum);
}

//Database Model
const { models } = require("../../models");
// const UserProfile = models.user_profile;
const Subjects = models.subjects;
const Organisation = models.user_organisation;

const SubjectCreate = async (req, res, next) => {
  const { subjects, classId } = req.body;
  const orgId = req.params.__user_org_id__;

  const getOrgInfo = await Organisation.findOne({ where: { id: orgId } }).then(
    (data) => {
      return data?.dataValues;
    }
  );

  //generate random password for the account
  await Promise.all(
    subjects.map(async (subject) => {
      subject.id = uuid();
      subject.classId = classId;
      subject.total_marks = 100;
      subject.passing_marks = 30;
      if (!subject.code)
        subject.code = `${getOrgInfo.short_name}-SUB-${generateToken()}`;
    })
  );

  Subjects.bulkCreate(subjects)
    .then((data) => {
      res.status(200).json(response.success(data, 7013));
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(response.error(res.statusCode, 7014));
    });
};

module.exports = SubjectCreate;
