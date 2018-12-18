export const defaultUser = "net";
export const defaultUsers = ["net", "prang"];

export const AnalysicEvent = (event, defaultUser, users, defaultPath, paths, defaultBranch = "master") => {
  let user = event.queryStringParameters.user || defaultUser;
  let branch = event.queryStringParameters.branch || defaultBranch;
  let type = event.queryStringParameters.type || defaultPath;
  let types = [type];

  const userIndex = users.findIndex(u => event.path.includes(`/${u}`));
  if (userIndex >= 0) user = users[userIndex];

  if (defaultPath) {
    const matches = paths.filter(p => event.path.includes(`/${p}`));
    if (matches && matches.length > 0) {
      type = matches[0];
      types = matches;
    }
  }

  return {
    user: user,
    type: type,
    types: types,
    branch: branch
  };
};
