export function buildRoutePath(path) {
  const routeParametersRegx = /:([a-zA-Z]+)/g;
  const pathWithParameters = path.replaceAll(
    routeParametersRegx,
    "(?<$1>[a-z0-9-_]+)"
  );

  const pathRegex = new RegExp(`^${pathWithParameters}(?<query>\\?(.*))?$`);

  return pathRegex;
}
