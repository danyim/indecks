var path = require('path');

const loaderConfig = [
  {
    test: /\.js$/,
    loaders: ['babel'],
    include: path.join(__dirname, 'client')
  },
  // CSS
  {
    test: /\.styl$/,
    // include: path.join(__dirname, 'client'),
    // loader: 'style!css!stylus' // Original
    // TODO: Get local scoping to work
    loader: 'style!css?module&localIdentName=[local]---[hash:base64:5]!postcss!stylus'
    // loader: 'style!css!postcss!stylus'
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
  }
];

module.exports = loaderConfig;
