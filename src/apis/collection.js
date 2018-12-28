const {
  ParseParameters,
  GenObj
} = require('../../lib/parseUrl')

const {
  GHAPIs
} = require('../../lib/ghApi')

const query = async (octokit, key, user) => {
  const raw = await QueryContent(octokit, user, key);
  const results = TransformResult(raw);

  const json = {};
  json[key] = await MultipleQueryResult(results);
  return json;
};

exports.handler = function (event, context, callback) {
  const result = ParseParameters(event,
    GenObj("user", ["net", "prang"]),
    GenObj("branch", ["master", "dev"]),
    GenObj("lang", ["en", "th"]),
    GenObj("type", [
      "educations",
      "interests",
      "languages",
      "projects",
      "references",
      "skills",
      "volunteers",
      "works"
    ], ["projects"]));

  const apis = new GHAPIs(event);

  apis.queryAll(result.type, result).then(v => {
      callback(undefined, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(v)
      });
    })
    .catch(callback);

  // const octokit = new Octokit({
  //   headers: {
  //     authorization: event.headers.authorization
  //   }
  // });

  // (async () => {
  //   // TODO: implement performance here
  //   const response = await Promise.all(result.type.map(async type => await query(octokit, type, result.user)));
  //   return response.reduce((p, c) => {
  //     const key = Object.keys(c)[0];
  //     p[key] = c[key];
  //     return p;
  //   }, {});
  // })()
  // .then(v => {
  //     callback(undefined, {
  //       statusCode: 200,
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Headers": "*"
  //       },
  //       body: JSON.stringify(v)
  //     });
  //   })
  //   .catch(callback);
};