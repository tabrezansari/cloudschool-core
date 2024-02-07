const InternalUserRegister = require("./user.internal.register");
const UserList = require("./user.list");
const getProfile = require("./user.profile");
const updataProfileAvatar = require("./user.profile.avatar");
const MoveStudents = require("./user.student.move");
const RegisterStudents = require("./user.student.register");
const UpdateUserStatus = require("./user.update_status");

module.exports = {
  UserList: UserList,
  InternalUserRegister: InternalUserRegister,
  getProfile: getProfile,
  RegisterStudents: RegisterStudents,
  UpdateUserStatus: UpdateUserStatus,
  MoveStudents: MoveStudents,
  updataProfileAvatar: updataProfileAvatar,
};
