const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development'
const isDev = nodeEnv !== 'production'

const loaderConfig = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    include: path.join(__dirname, 'src'),
    loader: 'babel-loader',
    options: {
      cacheDirectory: isDev,
    }
  },
  // CSS
  {
    test: /\.styl$/,
    // include: path.join(__dirname, 'src'),
    // loader: 'style!css!stylus' // Original
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true,
            modules: true,
            context: path.join(process.cwd(), './src'),
            localIdentName: isDev ? '[name]__[local].[hash:base64:5]' : '[hash:base64:5]',
            minimize: !isDev
          }
        },
        'postcss-loader',
        'stylus-loader'
      ]
    })
  },
  {
    test: /\.(png|jpg)$/,
    use: [
      {
        loader: 'url-loader?limit=8192'
      },
    ]
  },
  {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version',
      'less-loader?outputStyle=expanded&sourceMap'
    ]
  },
  // the url-loader uses DataUrls.
  // the file-loader emits files.
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      'url-loader?limit=10000&mimetype=application/font-woff'
    ]
  },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      'url-loader?limit=10000&mimetype=application/font-woff'
    ]
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      'url-loader?limit=10000&mimetype=application/octet-stream'
    ]
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      'file-loader'
    ]
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      'url-loader?limit=10000&mimetype=image/svg+xml'
    ]
  },
];

module.exports = loaderConfig;
