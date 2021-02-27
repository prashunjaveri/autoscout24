const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
  entry: {
    app: './src/index.ts'
  },
  target:'node',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist'), path.join(__dirname, 'build')],
      dangerouslyAllowCleanPatternsOutsideProject: true
    }),
    new CopyWebpackPlugin({
        patterns: [
          {
            from: './html/*.html',
            to: '.'
          },
        ]
      })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
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
        options: {
          limit: 8192
        }
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
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'scss', 'css']
  }
});
