const path = require("path");
const HtmlWebpackPlugin = require ("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  resolve:{
    extensions:['.tsx', '.ts', '.js'],
  },
  module:{
    rules: [
      {test: /\.tsx?$/, loader: "ts-loader", exclude:/node_modules/},
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};