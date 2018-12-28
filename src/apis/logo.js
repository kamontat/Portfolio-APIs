const {
  ParseParameters,
  GenObj
} = require('../../lib/parseUrl')

const {
  FetchUrl,
  LogoLink
} = require("../../lib/ghLink");

exports.handler = function (event, context, callback) {
  const result = ParseParameters(event,
    GenObj("branch", ["master", "dev"]),
    GenObj("color", ["primary", "light", "dark"]),
    GenObj("size", ["normal", "small", "high"]),
    GenObj("type", ["normal", "round"]),
    GenObj("extension", ["png", "svg"]))

  const url = LogoLink(result.color, result);

  FetchUrl(url, {
      axiosOptions: {
        responseType: 'arraybuffer'
      },
      all: true
    }).then(response => {
      let image = Buffer.from(response.data, 'binary').toString('base64')

      callback(undefined, {
        statusCode: response.status,
        headers: {
          "Content-Type": result.extension === "svg" ? "image/svg+xml" : "image/png",
          "Content-Length": response.headers['content-length'],
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: image,
        isBase64Encoded: true
      });
    })
    .catch(callback);
}