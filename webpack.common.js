const path = require ('path');

const IN_DIR = path.join(__dirname, "src", "index.js");
const OUT_DIR = path.join(__dirname, "public")

module.exports = {
  entry: IN_DIR,
  output: {
    filename: "bundle.js",
    path: OUT_DIR
  },
  module: {
    rules: [
      {
        test: /\.m?(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
}