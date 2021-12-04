const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    // this is important to resolve graphql, see https://github.com/apollographql/apollo-server/issues/4637#issuecomment-706813287
    alias: {
      graphql$: path.resolve(__dirname, "../../node_modules/graphql/index.js"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: {
    // Possible drivers for knex - we'll ignore them
    "pg-native": "pg-native",
    sqlite3: "commonjs sqlite3",
    "pg-query-stream": "pg-query-stream",
    oracledb: "oracledb",
    mysql2: "mysql2",
    mysql: "mysql",
    "mssql/package.json": "test",
    "mssql/lib/base": "mssql/lib/base",
    mariasql: "mariasql",
    mssql: "mssql",
    tedious: "tedious",
    oracledb: "oracledb",
  },
};
