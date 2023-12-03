require("dotenv").config();

const attachAssetURL = (type = "avatar", avatar) => {
  return process.env.STORAGE_BUCKET_URL + "/" + type + "/" + avatar;
};

module.exports = {
  attachAssetURL,
};
