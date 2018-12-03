const path = require('path');

module.exports = {
  context: __dirname,
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"), // string
    filename: "bundle.js", // string
  },
  devtool: "source-map",
  target: "web",
  devServer: {
    hot: true,
    inline: true,
    index: 'index.html'
  }
};