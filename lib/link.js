const repo_owner = "kcnt-info";
const repo_name = "website";
const branch = "master";

export const Information = {
  owner: repo_owner,
  repo: repo_name,
  branch: branch
};

export const generateLink = (username, path, opts = {}) => {
  return `https://raw.githubusercontent.com/${repo_owner}/${repo_name}/${opts.branch ||
    branch}/static/resources/${username}/${path}`;
};

export const PersonalInformationLink = (user, opts = {}) => {
  return generateLink(user, "personal/information.json", opts);
};

export const PersonalSocialLink = (user, opts = {}) => {
  return generateLink(user, "personal/social.json", opts);
};
