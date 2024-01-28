const moment = require("moment");
const { Sequelize } = require("sequelize");
const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Users = models.users;

const generateInsight = (userList) => {
  let response = [];
  let lastFifthYear = moment().subtract(5, "year").format("YYYY");
  console.log(lastFifthYear);
  [2018, 2019, 2020, 2021, 2022, 2023, 2024].forEach((year) => {
    let students = userList.filter(
      (student) => parseInt(moment(student.createdAt).format("YYYY")) === year
    );
    response.push({
      year: year,
      count: students.length,
    });
  });

  return response;
};
const DashboardAdmissionFlow = async (req, res, next) => {
  try {
    const admissionList = await Users.findAll({
      include: { model: models.user_roles, where: { role_name: "Student" } },
    }).then((data) => {
      return data;
    });

    const resultResponse = await generateInsight(admissionList);
    res.status(200).json(response.success(resultResponse, 5003));
  } catch (error) {
    res.status(500).json(response.error(res.statusCode, 5004));
  }
};

module.exports = DashboardAdmissionFlow;
