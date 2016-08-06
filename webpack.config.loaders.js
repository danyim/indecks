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
    include: path.join(__dirname, 'client'),
    loader: 'style-loader!css-loader!stylus-loader'
  }
  /*,
  {
    test: /\.scss$/,
    loaders: ['style', 'css?module&localIdentName=[local]---[hash:base64:5]', 'postcss', 'sass']
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
  }*/
];

module.exports = loaderConfig;
