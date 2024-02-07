const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIA3FFQLGDOKIBZGJPB",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const s3 = new AWS.S3();

async function uploadAsset(path, fileBuffer, filename) {
  const params = {
    Bucket: "cschoolstage" + path,
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
      Bucket: "cschoolstage" + path,
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
