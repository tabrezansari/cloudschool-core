const AWS = require("aws-sdk");

module.exports = () => {
  //configure AWS SDK
  const region = "ap-south-1";
  const client = new AWS.SecretsManager({ region });

  const SecretId = "stage_secret";
  return new Promise((resolve, reject) => {
    //retrieving secrets from secrets manager
    client.getSecretValue({ SecretId }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        //parsing the fetched data into JSON
        const secretsJSON = JSON.parse(data.SecretString);

        let secretsString = "";
        Object.keys(secretsJSON).forEach((key) => {
          secretsString += `${key}=${secretsJSON[key]}\n`;
        });
        resolve(secretsString);
      }
    });
  });
};
