const MarkAttendance = require("./class.attendance");
const ClassAttendanceView = require("./class.attendance.view");
const classCreate = require("./class.create");
const classList = require("./class.list");
const classSectionCreate = require("./class.section.create");
const classUpdate = require("./class.update");

module.exports = {
  classList: classList,
  classCreate: classCreate,
  classSectionCreate: classSectionCreate,
  classUpdate: classUpdate,
  MarkAttendance: MarkAttendance,
  ClassAttendanceView: ClassAttendanceView,
};
