function classAssociations(sequelize) {
  const {
    class_sections,
    classes,
    subjects,
    exam_participants,
    users,
    class_exams,
    exam_results,
    user_organisation,
  } = sequelize.models;

  /* User Associations */

  //  user_organisation <---> users
  user_organisation.hasMany(classes);
  classes.belongsTo(user_organisation);
  //  user_organisation <---> users

  //  classes <---> sections
  classes.hasMany(class_sections);
  class_sections.belongsTo(classes);
  //  User <---> sections

  //  sections <---> subjects
  classes.hasMany(subjects);
  subjects.belongsTo(classes);
  //  sections <---> subjects

  //  sections <---> subjects
  classes.hasMany(class_exams);
  class_exams.belongsTo(classes);
  //  sections <---> subjects

  //  exams <---> exam_participants
  class_exams.hasMany(exam_participants);
  exam_participants.belongsTo(class_exams);
  //  exams <---> exam_participants

  //  users <---> exam_participants
  users.hasMany(exam_participants);
  exam_participants.belongsTo(users);
  //  users <---> exam_participants

  //  class_exam <---> exam_results
  class_exams.hasMany(exam_results);
  exam_results.belongsTo(class_exams);
  //  class_exam <---> exam_results

  //  subjects <---> exam_results
  subjects.hasMany(exam_results);
  exam_results.belongsTo(subjects);
  //  subjects <---> exam_results

  //  exam_participants <---> exam_results
  exam_participants.hasMany(exam_results);
  exam_results.belongsTo(exam_participants);
  //  exam_participants <---> exam_results

  /* End of User Associations */
}

module.exports = classAssociations;
