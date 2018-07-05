const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: ["babel-polyfill", './lib'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rozet.min.js',
    libraryTarget: 'umd',
    library: 'rozet',
    // Workaround to fix umd build, restore webpack v3 behaviour
    // https://github.com/webpack/webpack/issues/6677
    // https://github.com/webpack/webpack/issues/6642
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({ sourceMap: true }),
  ]
}