const axios = require("axios");

const {
  ParseParameters,
  GenObj
} = require('../../lib/parseUrl')

const {
  PersonalInformationLink,
  PersonalSocialLink
} = require("../../lib/ghLink");

exports.handler = function (event, _, callback) {
  const result = ParseParameters(event,
    GenObj("user", ["net", "prang"]),
    GenObj("branch", ["master", "dev"]),
    GenObj("lang", ["en", "th"]),
    GenObj("type", ["information", "social"]));

  const url =
    result.type === "social" ?
    PersonalSocialLink(result.user, {
      branch: result.branch
    }) :
    PersonalInformationLink(result.user, {
      branch: result.branch
    });

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