import routes from './routes';
import {Router, browserHistory, RouterContext } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import defaultState from './store';
import {Provider} from 'mobx-react';
import Root from 'containers/Root';

function makeWrapper(props) {
	return (
		<Provider state={defaultState}>
			<Root>
				<RouterContext {...props} />
			</Root>
		</Provider>
	);
}
ReactDOM.render(
	<Router render={makeWrapper} routes={routes} history={browserHistory} />
	, document.getElementById('root')
);
