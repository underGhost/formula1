import url from 'url';
import path from 'path';
import http from 'http';
import express from 'express';
import webpack from 'webpack';
import fetch from 'isomorphic-fetch';
import config from '../webpack.config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8000 : process.env.PORT;
const app = express();

app.get('/auth', (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const token = parsedUrl.query.token;
  const search = parsedUrl.query.term;

  if(token) {
      const url = search ? 'https://api.instagram.com/v1/tags/'+search+'/media/recent/' : 'https://api.instagram.com/v1/users/self/media/recent/';
      fetch(url+'?access_token='+token).then((response) => {
        if (response.status >= 400) {
            throw new Error("Bad response from Instagram");
        }
        return response.json();
      }).then((data)  => {
        res.write(JSON.stringify(data));
        res.end();
      });
  } else {
    res.status(400).send({ error: 'No token supplied' });
  }
});

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: path.resolve(__dirname, '../src'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
  console.info('    ==> 🌎  Server listening on port %s. Open up http://localhost.com:%s in your browser.',port,port);
});
