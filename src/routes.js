import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from 'containers/App';
import Formulas from 'components/formula';

const routes = () => {
  return (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Formulas}/>
        </Route>
      </Router>
  );
};

export default routes;
