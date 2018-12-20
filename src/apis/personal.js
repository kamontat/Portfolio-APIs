const axios = require("axios");

const { PersonalInformationLink, PersonalSocialLink } = require("../../lib/link");
const { AnalysicEvent, defaultUser, defaultUsers } = require("../../lib/analysic");

exports.handler = function(event, _, callback) {
  const result = AnalysicEvent(event, defaultUser, defaultUsers, "information", ["information", "social"]);
  console.log(result);

  const url =
    result.type === "social"
      ? PersonalSocialLink(result.user, { branch: result.branch })
      : PersonalInformationLink(result.user, { branch: result.branch });

  axios
    .get(url)
    .then(result => {
      callback(undefined, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(result.data)
      });
    })
    .catch(callback);
};
