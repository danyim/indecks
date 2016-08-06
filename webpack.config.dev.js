var path = require('path');
var webpack = require('webpack');
var loaders = require('./webpack.config.loaders');
var autoPrefixer = require('autoprefixer');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/indecks'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    definePlugin
  ],
  module: {
    loaders
  },
  resolve: {
    extensions: ['', '.js', '.styl']
  },
  postcss: [autoPrefixer({ browsers: ['last 2 versions'] })]
};
