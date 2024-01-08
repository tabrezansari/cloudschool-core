const { attachAssetURL } = require("../../helpers/Formatter/AvatarFormatter");
const response = require("../../helpers/response");

//Database Model
const { models } = require("../../models");
const Users = models.users;

const getProfile = async (req, res, next) => {
  const userId = req.body.user_id;
  const otherUserId = req.params.otherUserId;

  const finalUserId = otherUserId || userId;
  Users.findOne({
    include: [
      {
        model: models.user_profile,
      },
    ],
    where: { id: finalUserId },
  })
    .then((data) => {
      if (data) {
        const profileInfo = data.get({ plain: true });

        res.status(200).json(response.success(profileInfo, 2001));
      } else {
        res.status(500).json(response.error(res.statusCode, 2002));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(response.error(res.statusCode, 2002));
    });
};

module.exports = getProfile;
