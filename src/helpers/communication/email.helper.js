require("dotenv").config();
const fetch = require("node-fetch");

const templateMap = {
  SIGNUP: "initial_mail",
  INVITE: "invite_mail",
  STUDENT_INVITE: "student_invite",
};
const sendEmail = async (email, emailType, variablesMap) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    authkey: process.env.MSG_91_API_KEY,
  };

  let body = {
    recipients: [
      {
        to: [
          {
            email: email,
            name: email,
          },
        ],
        variables: variablesMap,
      },
    ],
    from: {
      email: "noreply@rsmindapps.site",
    },
    domain: "rsmindapps.site",
    template_id: templateMap[emailType],
  };

  fetch("https://control.msg91.com/api/v5/email/send", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

module.exports = sendEmail;
