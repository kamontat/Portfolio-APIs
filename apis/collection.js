// const axios = require("axios");
const Octokit = require("@octokit/rest");

// const { PersonalInformationLink, PersonalSocialLink } = require("../lib/link");
const { AnalysicEvent, defaultUser, defaultUsers } = require("../lib/analysic");
const { QueryContent, TransformResult, MultipleQueryResult } = require("../lib/content");

const query = async (octokit, key, user) => {
  const raw = await QueryContent(octokit, user, key);
  const results = TransformResult(raw);

  const json = {};
  json[key] = await MultipleQueryResult(results);
  return json;
};

exports.handler = function(event, context, callback) {
  const octokit = new Octokit({
    headers: { authorization: event.headers.authorization }
  });

  const params = AnalysicEvent(event, defaultUser, defaultUsers, "projects", [
    "educations",
    "interests",
    "languages",
    "projects",
    "references",
    "skills",
    "volunteers",
    "works"
  ]);

  (async () => {
    // TODO: implement performance here
    const result = await Promise.all(params.types.map(async type => await query(octokit, type, params.user)));
    return result.reduce((p, c) => {
      const key = Object.keys(c)[0];
      p[key] = c[key];
      return p;
    }, {});
  })()
    .then(v => {
      callback(undefined, {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v)
      });
    })
    .catch(callback);
};
