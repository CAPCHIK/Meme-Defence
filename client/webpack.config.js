const path = require("path");
const Dotenv = require("dotenv-webpack");

const config = {
  target: "web",
  devtool: "inline-source-map",
  entry: path.join(__dirname, "src/index.ts"),
  output: {
    filename: "client.js",
    path: path.join(__dirname, "build/")
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["node_modules", "../shared"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  },
  plugins: [],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    port: 8088,
    index: "index.html"
  }
}

module.exports = (env, argv) => {
  config.plugins.push(new Dotenv({
    path: `.env.${argv.mode}`
  }));
  return config;
};
