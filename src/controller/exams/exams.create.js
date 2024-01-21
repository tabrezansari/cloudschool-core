const response = require("../../helpers/response");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");
const moment = require("moment");

//Database Model
const { models } = require("../../models");
const { ACCOUNT_STATUS_TYPES } = require("../../constants/global.constants");
// const UserProfile = models.user_profile;
const Exams = models.class_exams;
const Organisation = models.user_organisation;
const Students = models.users;
const ExamParticipant = models.exam_participants;

function generateToken() {
  const randomNum = Math.random() * 9000;
  return Math.floor(1000 + randomNum);
}

const createExamParticipants = async (examData, req, res, next) => {
  const { classId } = req.body;

  const payload = [];

  const classStudents = await Students.findAll({
    include: {
      model: models.class_sections,
      include: {
        model: models.classes,
        where: { id: classId },
      },
    },
  }).then((data) => {
    return data;
  });
  await classStudents.forEach((student) => {
    payload.push({
      id: uuid(),
      classExamId: examData.id,
      userId: student.id,
    });
  });

  ExamParticipant.bulkCreate(payload)
    .then((data) => {
      res.status(200).json(response.success(data, 7003));
    })
    .catch((err) => {
      res.status(500).json(response.error(res.statusCode, 7004));
    });
};

const examCreate = async (req, res, next) => {
  const { name, marks_type, classId } = req.body;
  const orgId = req.params.__user_org_id__;

  const getOrgInfo = await Organisation.findOne({ where: { id: orgId } }).then(
    (data) => {
      return data?.dataValues;
    }
  );

  //generate random password for the account
  const payload = {
    id: uuid(),
    name: name,
    year: moment().format("YYYY"),
    marks_type: marks_type,
    exam_code: `${getOrgInfo.short_name}-XM-${generateToken()}`,
    classId: classId,
    status: "IN_PROGRESS",
  };
  Exams.create(payload)
    .then((data) => {
      const plaindata = data.get({ plain: true });
      if (plaindata) {
        createExamParticipants(plaindata, req, res, next);
      } else {
        res.status(200).json(response.success(plaindata, 7004));
      }
    })
    .catch((err) => {
      res.status(401).json(response.error(res.statusCode, 7004));
    });
};

module.exports = examCreate;
