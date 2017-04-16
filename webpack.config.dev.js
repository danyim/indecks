'use strict'; // eslint-disable-line

var path = require('path');
var webpack = require('webpack');
var rules = require('./webpack.config.rules');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoPrefixer = require('autoprefixer');
var poststylus = require('poststylus');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv !== 'production';

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
    'font-awesome-webpack!./src/styles/font-awesome.config.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true,
      disable: isDev,   // Disable css extracting on development
      ignoreOrder: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
    })
  ],
  module: {
    rules
  },
  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  }
};
