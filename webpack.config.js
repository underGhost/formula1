var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var PORT = process.env.PORT || 8000;
var PRODUCTION = process.env.NODE_ENV === 'production';
var SRC_DIR = path.resolve(__dirname, './src');

var config = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: ''
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html' })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: ['react-hot', 'babel'],
        include: SRC_DIR
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
};

if (!PRODUCTION) {
  config.devtool = 'eval';
  var dev = [
    'webpack-dev-server/client?http://localhost:' + PORT,
    'webpack/hot/only-dev-server'
  ];
  config.entry.concat(dev);
}

module.exports = config;
