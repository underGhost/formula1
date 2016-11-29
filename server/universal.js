/*eslint no-console: 0*/
import url from 'url';
import path from 'path';
import http from 'http';
import express from 'express';
import webpack from 'webpack';
import fetch from 'isomorphic-fetch';
import config from '../webpack.config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Webpack_isomorphic_tools from 'webpack-isomorphic-tools';
import routes from '../src/routes';
import { match, RouterContext } from 'react-router';

// this global variable will be used later in express middleware
global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(require('./webpack-isomorphic-config'));

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8000 : process.env.PORT;
const app = express();

app.set('views', path.join(__dirname, '../src'));
app.set('view engine', 'ejs');
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

if (isDeveloping) {
  app.use(webpackHotMiddleware(compiler));
  // clear require() cache if in development mode
  // (makes asset hot reloading work)
  webpack_isomorphic_tools.refresh();
} else {
  app.use(express.static(__dirname + '../dist'));
}

let responseBodyModifier = html => html;

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
   if (error) {
     //500
     res.status(500).send(error.message);
   } else if (redirectLocation) {
     //REDIRECT
     console.log('REDIRECTING', redirectLocation.pathname);
     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
   } else if (renderProps) {
    //RENDER ON CLIENT
    const markup = renderToStaticMarkup(<RouterContext {...renderProps} />);
    res.render('index', { markup }, (err, html) => {
      if (err) {
        console.error('Error rendering response: ', err);
      }
      res.send(responseBodyModifier(html));
    });
   } else {
     //404 Fallback
     res.status(404).send('Not found');
   }
 });
});

const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
  console.info('    ==> 🌎  Server listening on port %s. Open up http://localhost.com:%s in your browser.',port,port);
});
