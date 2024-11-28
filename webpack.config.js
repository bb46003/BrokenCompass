/* eslint-disable */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// const StylelintPlugin = require("stylelint-webpack-plugin");

const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env) => {
  const config = {
    entry: "./src/brokencompass.js",
    mode: "production",
    devtool: "inline-source-map",
    resolve: {
      extensions: [".js", ".json"],
    },
    output: {
      filename: "system.js",
      path: "C:/Users/bartl/AppData/Local/FoundryVTT/Data/systems/brokencompass",
      publicPath: "/systems/brokencompass/",
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    devServer: {
      hot: true,
      proxy: [
        {
          context: (pathname, req) => {
            return !pathname.match("^/ws");
          },
          target: "http://localhost:30000",
          ws: true,
        },
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "prettier-loader",
          options: {
            parser: "babel",
          },
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: false,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // new StylelintPlugin(),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [{ from: "system" }],
      }),
      new ESLintPlugin(),
    ],
  };

  return config;
};
