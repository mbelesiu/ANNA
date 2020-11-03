const path = require('path');

const SRC_FILE = path.resolve(__dirname, 'client', 'index.jsx');
const OUT_DIR = path.resolve(__dirname, 'public');

module.exports = {
  entry: ["@babel/polyfill", SRC_FILE],
  output: {
    path: OUT_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: 'babel-loader',
      }, {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  // externals: {
  //   'styled-components': 'styled-components',
  // },
};