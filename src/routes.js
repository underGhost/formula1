import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Login from 'containers/Login';
import FormulasList from 'components/formulaList';

export default (
      <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <Route path="/formulas" component={FormulasList} />
      </Route>
  );
