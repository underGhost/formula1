import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from 'containers/App';
import Login from 'containers/Login';
import FormulasList from 'components/formulaList';

const routes = () => {
  return (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Login}/>
          <Route path="formulas" component={FormulasList} />
        </Route>
      </Router>
  );
};

export default routes;
