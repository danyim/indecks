'use strict'; // eslint-disable-line

const path = require('path')
const webpack = require('webpack')
const rules = require('./webpack.config.rules')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const autoPrefixer = require('autoprefixer');
// const poststylus = require('poststylus');

const nodeEnv = process.env.NODE_ENV || 'development'
const isDev = nodeEnv !== 'production'

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'font-awesome-webpack!./src/styles/font-awesome.config.js',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        // Javascript lint
        eslint: { failOnError: true },
        context: '/',   // Required for the sourceMap of css/sass loader
        debug: isDev,
        minimize: !isDev
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true,
      disable: isDev,   // Disable css extracting on development
      ignoreOrder: true
    }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules
  },
  resolveLoader: {
    modules: ['src', 'node_modules']
  },
  resolve: {
    modules: ['src', 'node_modules'],
    descriptionFiles: ['package.json'],
    moduleExtensions: ['-loader'],
    extensions: ['.js', '.jsx', '.json', '.styl']
  }
}
