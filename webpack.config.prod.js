var path = require('path');
var webpack = require('webpack');
var loaders = require('./webpack.config.loaders');
var autoPrefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __DEV__: 'false'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders
  },
  resolve: {
    extensions: ['', '.js', '.styl']
  },
  postcss: [autoPrefixer({ browsers: ['last 2 versions'] })]
};
