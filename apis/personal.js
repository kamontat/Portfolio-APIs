const axios = require("axios");

const { PersonalInformationLink, PersonalSocialLink } = require("../lib/link");
const { AnalysicEvent, defaultUser, defaultUsers } = require("../lib/analysic");

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data)
      });
    })
    .catch(callback);
};
