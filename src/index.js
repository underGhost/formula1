import App from 'containers/App';
import React from 'react';
import ReactDOM from 'react-dom';
import AppStore from './store';
import DevTools from 'mobx-react-devtools';
ReactDOM.render(
	<span><DevTools position={{bottom: 0, right: 0}}/><App store={AppStore}/></span>, document.getElementById('root')
);
