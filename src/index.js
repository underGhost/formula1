import App from 'containers/App';
import React from 'react';
import ReactDOM from 'react-dom';
import AppStore from './store';
import DevTools from 'mobx-react-devtools';
const env = process.env.NODE_ENV;
const APP = env === 'production' ? <App store={AppStore}/> : <span><DevTools position={{bottom: 0, right: 0}}/><App store={AppStore}/></span>; 
ReactDOM.render(
	APP, document.getElementById('root')
);
