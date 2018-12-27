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
 * generate github link to query result
 * @param {String} path path from root folder
 * @param {Object} opts options
 * @param {String} opts.branch branch of result
 */
export const GenerateGithubLink = (path, opts = {}) => {
  const link = `https://raw.githubusercontent.com/${repo_owner}/${repo_name}/${opts.branch ||
    branch}/static/resources/${path}`;
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