var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var PORT = process.env.PORT || 8000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true },
  inline: true
})
.listen(PORT, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + PORT);
});
