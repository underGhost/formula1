import App from 'containers/App';
import React from 'react';
import ReactDOM from 'react-dom';
import AppStore from './state';

ReactDOM.render(
	<App store={AppStore}/>, document.getElementById('root')
);
