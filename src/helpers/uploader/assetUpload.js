const AWS = require("aws-sdk");
const dotenv = require("dotenv");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: "ap-south-1",
});

const s3 = new AWS.S3();

async function uploadAsset(path, fileBuffer, filename) {
  const params = {
    Bucket: "cloudeskoolstage" + path,
    Key: filename,
    Body: fileBuffer,
  };

  return s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return false;
    }
    return data;
  });
}

async function uploadMultipleAsset(path, fileBuffer) {
  let ResponseData = [];

  fileBuffer.map(async (file) => {
    let bucketPayload = {
      Bucket: "cloudeskoolstage" + path,
      Key: file.filename,
      Body: file.file.buffer,
    };
    let response = await s3.upload(bucketPayload, (err, data) => {
      if (err) {
        console.error(err);
      }
      return data;
    });
    ResponseData.push(response);
  });
  return ResponseData;
}

async function deleteAssetFromBucket(path, key) {
  const params = {
    Bucket: "belarastage" + path,
    Key: key,
  };

  return s3.deleteObject(params, (err, data) => {
    if (err) {
      console.error(err);
      return false;
    }
    console.log("delte:", data);
    return data;
  });
}

module.exports = { uploadAsset, uploadMultipleAsset, deleteAssetFromBucket };
