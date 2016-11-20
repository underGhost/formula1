var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var SRC_DIR = path.resolve(__dirname, './src');
var publicPath = '';
var config = {
  devtool: 'eval-source-map',
  entry: [
    path.join(__dirname, './src/index')
  ],
  output: {
    path: path.join(__dirname, '/../dist/'),
    filename: 'app.js',
    publicPath: publicPath
  },
  resolve: {
    root: SRC_DIR,
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'src']
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, './src/images/icon128-2x.png'),
      filename: '../index.ejs',
      template: 'handlebars-loader!./src/index.ejs',
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};

module.exports = config;
