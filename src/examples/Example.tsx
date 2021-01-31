import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { AuthRouter, AuthService, AuthProvider, SecureRoute } from '@tag0/react-auth';
import { AuthRouter, AuthService, AuthProvider, SecureRoute } from '../';

const authService = new AuthService({
  options: {
    pathPrefix: '/auth',
    logoUrl: '/assets/images/logo.svg',
    logoTitle: 'ReactAuth'
  }
});

const App = () => {
  return (
    <Router>
      <AuthProvider service={authService}>
        <Switch>
          <Route path={authService.options.pathPrefix} component={AuthRouter} />
          <SecureRoute path="/home">
            <h1>Members Home</h1>
          </SecureRoute>
          <Redirect to="/home" />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
