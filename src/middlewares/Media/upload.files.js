const multer = require("multer");

let storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
let multipleUpload = multer({ storage: storage }).array("file");
let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15, // 5mb file size
  },
}).single("file");

module.exports = {
  multipleUpload,
  upload,
};
