function userAssociations(sequelize) {
  const {
    users,
    user_profile,

    user_password_reset,
    leads,
  } = sequelize.models;

  /* User Associations */

  //  user <---> profile
  users.hasOne(user_profile);
  user_profile.belongsTo(users);
  //  User <---> profile

  //  user <---> banks
  users.hasOne(user_password_reset);
  user_password_reset.belongsTo(users);
  //  User <---> banks

  /* End of User Associations */
}

module.exports = userAssociations;
