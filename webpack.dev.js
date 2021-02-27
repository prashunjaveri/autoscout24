const { merge } = require('webpack-merge');
const common = require('./webpack.common.js')();
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 8000
  },
  devtool: 'inline-source-map',
});
