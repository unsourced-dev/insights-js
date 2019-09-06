import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import sourceMaps from "rollup-plugin-sourcemaps"
import typescript from "rollup-plugin-typescript2"
import pkg from "./package.json"

export default {
  input: "src/index.ts",
  output: [
    // browser-friendly UMD build
    { file: pkg.browser, format: "umd", name: "insights" },
    // NodeJS build & build for bundled projects
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" }
  ],
  plugins: [
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Resolve source maps to the original source
    sourceMaps()
  ]
}
