const DeleteSubject = require("./subject.delete");
const SubjectCreate = require("./subjects.create");
const SubjectList = require("./subjects.list");

module.exports = {
  SubjectList: SubjectList,
  SubjectCreate: SubjectCreate,
  DeleteSubject: DeleteSubject,
};
