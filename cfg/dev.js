var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var isoToolsConfig = require('../server/webpack-isomorphic-config');
var isomporphicTools = new WebpackIsomorphicToolsPlugin(isoToolsConfig);

const devConfig = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '../src/index')
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    isomporphicTools.development(),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        includes: [
          path.join(__dirname, '../src'),
          path.join(__dirname, '../cfg'),
          path.join(__dirname, '../server')
        ]
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true' },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader?outputStyle=expanded'
        ]
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

module.exports = devConfig;
