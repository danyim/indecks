const path = require('path')
const webpack = require('webpack')
const rules = require('./webpack.config.rules')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: [
    // 'font-awesome-webpack!./src/styles/font-awesome.config.prod.js',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      __DEVELOPMENT__: 'false',
      FIREBASE_KEY: JSON.stringify(process.env.FIREBASE_KEY || ''),
      FIREBASE_ID: JSON.stringify(process.env.FIREBASE_ID || '')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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
    extensions: ['.js', '.jsx', '.json', '.styl']
  }
}
