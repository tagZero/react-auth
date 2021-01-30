import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
// import { AuthRouter, AuthService, AuthProvider, SecureRoute } from '@tag0/react-auth';
import { AuthRouter, AuthService, AuthProvider, SecureRoute } from '../';
import '../styles/reset.css';
import '../styles/font.css';
import '../styles/main.css';

const authService = new AuthService({
  options: {
    pathPrefix: '/auth',
    logoUrl: '/images/logo.svg',
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
