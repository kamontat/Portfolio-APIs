const pkg = require("../../package.json")

const {
  ParseParameters,
  GenObj
} = require('../../lib/parseUrl')

exports.handler = function (event, _, callback) {
  const result = ParseParameters(event,
    GenObj("format", ["json", "text"]))

  callback(undefined, {
    statusCode: 200,
    headers: {
      "Content-Type": result.format === "json" ? "application/json" : "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    },
    body: result.format === "json" ? JSON.stringify({
      version: pkg.version
    }) : pkg.version
  });
}