var path = require('path');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var isoToolsConfig = require('../server/webpack-isomorphic-config');
var isomporphicTools = new WebpackIsomorphicToolsPlugin(isoToolsConfig);
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var prodConfig = {
  devtool: 'eval-source-map',
  entry: [
    path.join(__dirname, '../src/index')
  ],
  plugins: [
    new ExtractTextPlugin('app.[contenthash].css', {allChunks: true}),
    isomporphicTools
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../cfg'),
          path.join(__dirname, '/../server')
        ]
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap&outputStyle=expanded')
      },
      {
        test: /\.json$/,
        loaders: ["json"]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
};

module.exports = prodConfig;
