const axios = require("axios");

const { Information } = require("../lib/link");

// return promise
export const QueryContent = (octokit, username, filename) => {
  const path = `static/resources/${username}/${filename}`;

  return octokit.repos.getContents({
    owner: Information.owner,
    repo: Information.repo,
    path,
    ref: Information.branch
  });
};

export const TransformResult = result => {
  const data = result.data || result;

  return data.reduce((p, c) => {
    if (c.name.includes(".json")) p.push(c.download_url);
    return p;
  }, []);
};

export const MultipleQueryResult = results => {
  // TODO: implement performance here
  return Promise.all(results.map(r => axios.get(r).then(v => v.data)));
};
