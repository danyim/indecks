const path = require('path')

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
    loader:
      'style?sourceMap!css?module&localIdentName=[local]---[hash:base64:5]!postcss?sourceMap!stylus'
    // loader: 'style!css!postcss!stylus'
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
  },

  {
    test: /\.less$/,
    loader:
      'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap'
  },
  // the url-loader uses DataUrls.
  // the file-loader emits files.
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream'
  },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml'
  }
]

module.exports = loaderConfig
