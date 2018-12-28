const {
  ParseParameters,
  GenObj
} = require('../../lib/parseUrl')

const {
  FetchUrl,
  GenerateGithubLink
} = require("../../lib/ghLink")

exports.handler = function (event, _, callback) {
  const result = ParseParameters(event,
    GenObj("type", ["all", "name", "description", "author", "version", "license", "dependencies", "devDependencies", "repository", "scripts"], ["all"]),
    GenObj("format", ["json", "text", "text-head"]),
    GenObj("repo", ["apis", "web", "docs"]),
    GenObj("branch", ["master", "dev"]));

  let repo = result.repo
  if (repo === "web") repo = "website"
  else if (repo === "docs") repo = "documents"

  const url = GenerateGithubLink("package.json", {
    repo,
    branch: result.branch,
    noPrefix: true
  })

  FetchUrl(url).then(pkg => {
    // case all
    if (result.type.includes("all")) return callback(undefined, {
      statusCode: 200,
      headers: {
        "Content-Type": result.format === "json" ? "application/json" : "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(pkg)
    });

    let response = result.type.reduce((p, c) => {
      p[c] = pkg[c];
      return p
    }, {})

    // transform to json
    if (result.format === "text" || result.format === "text-head") {
      response = Object.keys(response).reduce((p, key) => {
        const v = result.format === "text" ? response[key] : `${key}: ${response[key]}`

        if (p)
          return `${p}\n${v}`
        else return v
      }, undefined)
    }

    callback(undefined, {
      statusCode: 200,
      headers: {
        "Content-Type": result.format === "json" ? "application/json" : "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: result.format === "json" ? JSON.stringify(response) : response
    });
  })
}