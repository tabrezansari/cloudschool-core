const userObjectFormatter = (data) => {
  return {
    email: data.email,
    role_id: data.role_id,
    userId: data.user_profile.userId,
    first_name: data.user_profile.first_name,
    last_name: data.user_profile.lastname,
    avatar: data.user_profile.avatar,
    mobile: data.user_profile.mobile,
    nationality: data.user_profile.nationality,
    gender: data.user_profile.gender,
    dob: data.user_profile.dob,
    city: data.user_profile.city,
  };
};

module.exports = userObjectFormatter;
