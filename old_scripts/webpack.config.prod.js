const path = require('path')
const webpack = require('webpack')
const loaders = require('./webpack.config.loaders')
const autoPrefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'font-awesome-webpack!./src/styles/font-awesome.config.prod.js',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', {
      allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      __DEVELOPMENT__: 'false',
      FIREBASE_KEY: JSON.stringify(process.env.FIREBASE_KEY || ''),
      FIREBASE_ID: JSON.stringify(process.env.FIREBASE_ID || '')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  progress: true,
  module: {
    loaders
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },
  postcss: [autoPrefixer({ browsers: ['last 2 versions'] })]
}
