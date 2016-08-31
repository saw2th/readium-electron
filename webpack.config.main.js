const webpack = require("webpack");
const process = require("process");
const path = require("path");

var plugins = [
];

if (process.env.ENVIRONMENT === "DEV") {
  // Dev environment
  process.env.APP_ENTRY_RELATIVE_URL = "/../renderer/index.html";
} else {
  // Prod environment
  process.env.APP_ENTRY_RELATIVE_URL = "/index.html";
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}

module.exports = {
  context: path.resolve(__dirname, 'app/main'),
  entry: {
    main: "./app.js"
  },

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'build')
  },

  node: {
    __dirname: false,
    __filename: false
  },

  target: "electron-main",

  plugins: plugins,

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react", "stage-0"]
        }
      }
    ]
  }
};
