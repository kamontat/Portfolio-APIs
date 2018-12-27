const matchPath = (path, results) => {
  const index = results.findIndex(p => path.includes(`/${p}`))
  if (index < 0) return undefined;
  return results[index]
}

const matchQuery = (query, options) => {
  if (options === undefined) return query;
  return options.includes(query) ? query : undefined
}

/**
 * 
 * @param {String} name name of the key result and query name
 * @param {Array<String>} options possible values 
 * @param {String} defaultValue default value if value is not exist
 */
export const GenObj = (name, options,
  defaultValue = undefined) => {
  if (
    defaultValue === undefined ||
    defaultValue === null) defaultValue = options[0]

  return {
    name: name,
    default: defaultValue,
    options: options
  }
}

export const ParseParameters = (event, ...obj) => {
  const query = event.queryStringParameters;
  const path = event.path;
  const result = {};
  obj.forEach(v => {
    result[v.name] = matchPath(path, v.options) || matchQuery(query[v.name], v.options) || v.default
  })
  return result
}