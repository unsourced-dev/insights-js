export function getApiUrl(path: string): string {
  const trimmed = path[0] === "/" ? path.substr(1) : path
  return `https://getinsights.io/app/${trimmed}`
}
