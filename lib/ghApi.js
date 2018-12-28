const Octokit = require("@octokit/rest");
const Promise = require("bluebird");

import {
  Information,
  FetchUrl
} from "./ghLink";

export class GHAPIs {
  _octokit = undefined;

  constructor(event) {
    this._octokit = new Octokit({
      headers: {
        authorization: event.headers.authorization
      }
    });
  }

  queryAll(types, opts = {}) {
    return Promise.reduce(types, (p, c) => {
      return this.queryOnce(c, opts).then(res => {
        p[c] = res;
        return p
      })
    }, {})
  }

  queryOnce(type, opts = {}) {
    return this.queryFileList(opts.user, type, opts).then(files => {
      return Promise.all(files.map(url => FetchUrl(url)))
    })
  }

  queryFileList(user, folder, opts = {}) {
    const filter = opts.filter || '.json';
    const path = `static/resources/${user}/${folder}`;

    return this._octokit.repos.getContents({
      owner: Information.owner,
      repo: Information.repo,
      path,
      ref: opts.branch || Information.branch
    }).then(result => {
      const data = result.data || result;

      return data.reduce((p, c) => {
        if (c.name.includes(filter)) p.push(c.download_url);
        return p;
      }, []);
    })
  }
}