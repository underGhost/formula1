import Router from './routes';
import React from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
const env = process.env.NODE_ENV;
const APP = env === 'production' ? <Router/> : <span><DevTools position={{bottom: 0, right: 0}}/><Router/></span>;
ReactDOM.render(
	APP, document.getElementById('root')
);
