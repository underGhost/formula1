import routes from './routes';
import {Router, browserHistory} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(
	<Router history={browserHistory} routes={routes}/>, document.getElementById('root')
);
