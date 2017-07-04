const path = require('path')

const rules = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: path.join(__dirname, 'src')
  },
  // CSS
  {
    test: /\.styl$/,
    // include: path.join(__dirname, 'src'),
    // loader: 'style!css!stylus' // Original
    // TODO: Get local scoping to work
    use: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]---[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'stylus-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader',
    options: {
      limit: 8192
    }
  },
  {
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[local]---[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          outputStyle: 'expanded'
        }
      }
    ]
  },
  // the url-loader uses DataUrls.
  // the file-loader emits files.
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'application/font-woff'
    }
  },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'application/font-woff'
    }
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'application/octet-stream'
    }
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader'
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'image/svg+xml'
    }
  }
]

module.exports = rules
