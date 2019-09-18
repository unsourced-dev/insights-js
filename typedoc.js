module.exports = {
  out: "docs/",
  excludeNotExported: true,
  exclude: "node_modules",
  tsConfig: "./tsconfig.json",
  theme: "markdown",
  hideSources: true,
  entryPoint: "src/index.ts",
  hideGenerator: true
  // mode: "file"
}
