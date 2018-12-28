const axios = require("axios")

const repo_owner = "kcnt-info";
const repo_name = "website";
const branch = "master";
const language = 'en'

export const Information = {
  owner: repo_owner,
  repo: repo_name,
  branch: branch
};

/**
 * Fetch url power by axios
 * @param {String} url path to query
 * @param {Object} opts options
 * @param {Boolean} opts.all return all object from axios, otherwise return only data
 * @param {Object} opts.axiosOptions option parsing to axios get method
 */
export const FetchUrl = (url, opts = {}) => {
  return axios.get(url, opts.axiosOptions).then(v => opts.all ? v : v.data)
}

/**
 * generate github link to query result
 * @param {String} path path from root folder
 * @param {Object} opts options
 * @param {String} opts.branch branch of result
 * @param {String} opts.owner repo owner default: Information.owner
 * @param {String} opts.repo name of the repo default: Information.repo
 * @param {Boolean} opts.noPrefix remove `/static/resources` path
 */
export const GenerateGithubLink = (path, opts = {}) => {
  let prefixPath = '/static/resources'
  if (opts.noPrefix) prefixPath = ''

  const link = `https://raw.githubusercontent.com/${opts.owner || repo_owner}/${opts.repo || repo_name}/${opts.branch ||
    branch}${prefixPath}/${path}`;
  console.log(`query to: ${link}`);
  return link
}

/**
 * get api link of information file
 * @param {String} user username, should be `net` or `prang`
 * @param {Object} opts options
 * @param {String} opts.branch branch of result
 * @param {String} opts.language language of the result
 */
export const PersonalInformationLink = (user, opts = {}) => {
  return GenerateGithubLink(`${user}/personal/information-${opts.language || language}.json`, opts)
};

/**
 * get api link of social file
 * @param {String} user username, should be `net` or `prang`
 * @param {Object} opts options
 * @param {String} opts.branch branch of result
 */
export const PersonalSocialLink = (user, opts = {}) => {
  return GenerateGithubLink(`${user}/personal/social.json`, opts)
};

export const _logoPNGLink = (color, opts = {}) => {
  let postfix = '';
  let size = '1x';
  if (opts.size === "small") {
    size = '0.5x'
  } else if (opts.size === "high") {
    size = "300ppi"
    postfix = '-high'
  }

  const type = opts.type === "round" ? "-round-icon" : '-icon'

  // https://raw.githubusercontent.com/kcnt-info/website/dev/static/resources/images/icon/1x/dark-icon.png
  return GenerateGithubLink(`images/icon/${size}/${color}${type}${postfix}.png`, opts)
}

export const _logoSVGLink = (color, type, opts = {}) => {
  const postfix = type === "round" ? "-round-icon" : '-icon'
  // https://raw.githubusercontent.com/kcnt-info/website/dev/static/resources/images/icon/SVG/dark-icon.svg
  return GenerateGithubLink(`images/icon/SVG/${color}${postfix}.svg`, opts)
}

/**
 * get api link of social file
 * @param {String} user username, should be `net` or `prang`
 * @param {Object} opts options
 * @param {String} opts.branch branch of result
 */
export const LogoLink = (color, opts = {}) => {
  if (opts.extension === "png") return _logoPNGLink(color, opts);
  else return _logoSVGLink(color, opts.type, opts)
}