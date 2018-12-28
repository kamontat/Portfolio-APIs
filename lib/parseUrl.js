const matchPath = (path, results) => {
  const index = results.findIndex(p => path.includes(`/${p}`))
  if (index < 0) return undefined;
  return results[index]
}

const matchesPath = (path, results) => {
  return results.filter(p => path.includes(`/${p}`))
}

const matchQuery = (query, options) => {
  if (options === undefined) return query;
  return options.includes(query) ? query : undefined
}

const matchesQuery = (query, options) => {
  if (options === undefined) return [query];
  if (query === undefined) return [];

  return options.filter(p => query.includes(p))
}

/**
 * 
 * @param {String} name name of the key result and query name
 * @param {Array<String>} options possible values 
 * @param {String|Array<String>} defaultValue default value if value is not exist
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
    if (Array.isArray(v.default)) {
      if (result[v.name] === undefined) result[v.name] = [];

      const _paths = matchesPath(path, v.options)
      const _params = matchesQuery(query[v.name], v.options)

      if (_paths.length > 0) result[v.name].push(..._paths)
      else if (_params.length > 0) result[v.name].push(..._params)
      else if (v.default.length > 0) result[v.name].push(...v.default)
    } else {
      result[v.name] = matchPath(path, v.options) || matchQuery(query[v.name], v.options) || v.default
    }
  })
  console.log(result);
  return result
}