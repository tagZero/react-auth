import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthRouter, AuthProvider, SecureRoute } from '../'; // this would be import from '@tag0/react-auth';
import exampleAuthOptions from './ExampleAuthOptions';

const App = () => {
  const { securedRoute, authRoute } = exampleAuthOptions.options;
  return (
    <Router>
      <AuthProvider {...exampleAuthOptions}>
        <Switch>
          <Route path={authRoute} component={AuthRouter} />
          <SecureRoute exact path={securedRoute}>
            <h1>User Home</h1>
          </SecureRoute>
          <Redirect to={securedRoute} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
