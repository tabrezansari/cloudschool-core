require("dotenv").config();

const attachAssetURL = (type = "avatar", avatar) => {
  return avatar
    ? process.env.STORAGE_BUCKET_URL + "/" + type + "/" + avatar
    : null;
};

const getAssetPrefixURL = (type = "avatar") => {
  return process.env.STORAGE_BUCKET_URL + "/" + type + "/";
};

module.exports = {
  attachAssetURL,
  getAssetPrefixURL,
};
