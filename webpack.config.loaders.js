var path = require('path');

const loaderConfig = [
  {
    test: /\.jsx?$/,
    loaders: ['babel'],
    include: path.join(__dirname, 'src')
  },
  // CSS
  {
    test: /\.styl$/,
    // include: path.join(__dirname, 'src'),
    // loader: 'style!css!stylus' // Original
    // TODO: Get local scoping to work
    loader: 'style?sourceMap!css?module&localIdentName=[local]---[hash:base64:5]!postcss!stylus'
    // loader: 'style!css!postcss!stylus'
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
  }
];

module.exports = loaderConfig;
