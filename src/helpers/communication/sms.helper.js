require("dotenv").config();

const sdk = require("api")("@msg91api/v5.0#6n91xmlhu4pcnz");

const sendSMS = async (mobile, otp) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authkey: process.env.MSG_91_API_KEY,
    },
    body: JSON.stringify({
      template_id: "65587b48d6fc054cbd14f622",
      short_url: "0",
      recipients: [{ mobiles: "919686910438", var1: "332233" }],
    }),
  };

  await fetch("https://control.msg91.com/api/v5/flow/", options)
    .then((response) => response.json())
    .then((response) => {
      console.log("message resp", response);
    })
    .catch((err) => console.error(err));
};

module.exports = sendSMS;
