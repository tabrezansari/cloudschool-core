const InternalUserRegister = require("./user.internal.register");
const UserList = require("./user.list");
const getProfile = require("./user.profile");
const RegisterStudents = require("./user.student.register");

module.exports = {
  UserList: UserList,
  InternalUserRegister: InternalUserRegister,
  getProfile: getProfile,
  RegisterStudents: RegisterStudents,
};
