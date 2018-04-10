const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: './lib/index.js'
  },

  output: {
    path: __dirname + '/asset',
    filename: '[name].js'
  },

  plugins: [
    new Uglify()
  ]
};
