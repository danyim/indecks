require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const loaders = require('./webpack.config.loaders')
const autoPrefixer = require('autoprefixer')
const poststylus = require('poststylus')

const definePlugin = new webpack.DefinePlugin({
  __DEVELOPMENT__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  FIREBASE_KEY: JSON.stringify(process.env.FIREBASE_KEY || ''),
  FIREBASE_ID: JSON.stringify(process.env.FIREBASE_ID || '')
})

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    definePlugin
  ],
  module: {
    loaders
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },
  // postcss: [autoPrefixer({ browsers: ['last 2 versions'] })],
  stylus: {
    use: [poststylus([autoPrefixer({ browsers: ['last 2 versions'] })])]
  }
}
