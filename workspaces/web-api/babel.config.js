/**
 * Babel configuration needed to enable Jest and TypeScript to play together.
 * See more at: https://jestjs.io/docs/getting-started
 */
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
