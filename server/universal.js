import url from 'url';
import path from 'path';
import http from 'http';
import express from 'express';
import webpack from 'webpack';
import fetch from 'isomorphic-fetch';
import config from '../webpack.config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import phantom from 'phantom';
import React from 'react';
import { renderToString } from 'react-dom/server';
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

app.get('/scrape/*', (req, res) => {
  let sitepage = null;
  let phInstance = null;
  const http = req.url.match(/https?:\/\//gi) ? '' : 'http://';
  const website = http + req.url.replace('/scrape/', '');
  phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        return page.open(website);
    })
    .then(status => {
        console.log(status);
        return sitepage.property('content');
    })
    .then(content => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(content);
        res.end();
        sitepage.close();
        phInstance.exit();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });
});

let responseBodyModifier = html => html;

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
   if (error) {
     res.status(500).send(error.message);
   } else if (redirectLocation) {
     console.log('redirect location');
     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
   } else if (renderProps) {
     // You can also check renderProps.components or renderProps.routes for
     // your "not found" component or route respectively, and send a 404 as
     // below, if you're using a catch-all route.
    res.render('index', { markup: renderToString(<RouterContext {...renderProps} />)}, (err, html) => {
      if (err) {
        console.error('Error rendering response: ', err);
      }
      res.send(responseBodyModifier(html));
    });
   } else {
     res.status(404).send('Not found');
   }
 });
});

const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
  console.info('    ==> 🌎  Server listening on port %s. Open up http://localhost.com:%s in your browser.',port,port);
});
