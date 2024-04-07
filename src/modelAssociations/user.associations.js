function userAssociations(sequelize) {
  const {
    users,
    user_profile,
    user_password_reset,
    user_roles,
    class_sections,
    user_organisation,
    user_invites,
    user_attendance,
  } = sequelize.models;

  /* User Associations */

  //  user_organisation <---> users
  user_organisation.hasMany(users);
  users.belongsTo(user_organisation);
  //  user_organisation <---> users

  //  user <---> profile
  users.hasOne(user_profile);
  user_profile.belongsTo(users);
  //  User <---> profile

  //  user <---> user_organisation
  user_organisation.hasMany(user_invites);
  user_invites.belongsTo(user_organisation);
  //  User <---> user_organisation

  //  user <---> banks
  users.hasOne(user_password_reset);
  user_password_reset.belongsTo(users);
  //  User <---> banks

  //  user <---> roles
  user_roles.hasOne(users);
  users.belongsTo(user_roles);
  //  User <---> roles

  //  user <---> roles
  class_sections.hasMany(users);
  users.belongsTo(class_sections);
  //  User <---> roles

  //  user <---> roles
  users.hasMany(user_attendance);
  user_attendance.belongsTo(users);
  //  User <---> roles

  /* End of User Associations */
}

module.exports = userAssociations;
