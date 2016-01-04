var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var baseConfig = {
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
      { test: /\.jpg$/, loader: 'file' }
    ]
  },

  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}

function getNodeModules() {
  var nodeModules = {}
  fs.readdirSync('node_modules')
    .filter(function(x) { return ['.bin'].indexOf(x) === -1 })
    .forEach(function(mod) { nodeModules[mod] = 'commonjs ' + mod })
  return nodeModules
}

module.exports = [
  Object.assign({}, baseConfig, {
    entry: './modules/client.js',
    name: 'client',
    output: {
      path: __dirname + '/__build__',
      filename: 'client.js',
      chunkFilename: '[id].client.chunk.js',
      publicPath: '/__build__/'
    }
  }),
  Object.assign({}, baseConfig, {
    entry: './modules/server.js',
    target:'node',
    name: 'server',
    output: {
      path: __dirname + '/__build__',
      filename: 'server.js',
      publicPath: '/__build__/',
      
    },
    externals: getNodeModules()
  })
]
