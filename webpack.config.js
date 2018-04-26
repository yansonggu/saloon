/* eslint-env node */

var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var nodeExternals = require('webpack-node-externals');

module.exports = function (options = {}) {
  const filename = options.debug ? 'saloon.debug.js' : 'saloon.js';

  return {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename,
      library: 'saloon',
      libraryTarget: 'umd'
    },
    module: {
      rules: [{
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader'
      }]
    },
    target: 'node',
    externals: [nodeExternals()],
    plugins: [
      new webpack.DefinePlugin({
        __DEBUG__: options.debug
      }),

      options.debug ?
        _.noop :
        new webpack.optimize.UglifyJsPlugin({
          comments: false,
          compress: {
            warnings: false
          }
        })
      ]
  }
}
