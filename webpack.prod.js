const { merge } = require('webpack-merge');
const common = require('./webpack.common.js')();
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, (env, argv) => ({
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css|\.s(c|a)ss$/,
        use: [{
          loader: 'lit-scss-loader',
          options: {
            minify: true, // defaults to false
          },
        }, 'extract-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|gif|jpg|cur)$/i,
        loader: 'url-loader',
        options: {limit: 8192}
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'url-loader',
        options: { limit: 10000, mimetype: 'application/font-woff2' }
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'url-loader',
        options: { limit: 10000, mimetype: 'application/font-woff' }
      },
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' }
    ]
  }
}));
