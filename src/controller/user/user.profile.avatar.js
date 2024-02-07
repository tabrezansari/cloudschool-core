const response = require("../../helpers/response");
const sharp = require("sharp");

//Database Model
const { models } = require("../../models");
const { uuid } = require("uuidv4");
const { uploadAsset } = require("../../helpers/uploader/assetUpload");
const Profile = models.user_profile;
const updataProfileAvatar = async (req, res, next) => {
  const userId = req.params.user_id;
  const file = req.file;
  const filename = `${userId}.${file.originalname.split(".").pop()}`;
  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 128, width: 128, fit: "cover" })
    .toBuffer();

  const avatarPayload = {
    avatar: `${filename}`,
  };
  const isUploaded = await uploadAsset("/avatar", fileBuffer, filename);
  if (isUploaded) {
    Profile.update(avatarPayload, {
      where: { userId: userId },
    })
      .then((num) => {
        if (num == 1) {
          res.status(200).json(response.success(null, 2011));
        } else {
          res.status(500).json(response.error(res.statusCode, 2012));
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(response.error(res.statusCode, 2012));
      });
  } else {
    res.status(500).json(response.error(res.statusCode, 2012));
  }
};
// (this is how we create s3 instance in v3)

module.exports = updataProfileAvatar;
