import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthRouter, AuthProvider, SecureRoute } from '../'; // this would be import from '@tag0/react-auth';
import ExampleAuthService from './ExampleAuthService';
import '../styles/inter-ui.css';

const authService = new ExampleAuthService({
  options: {
    pathPrefix: '/auth',
    logoUrl: 'https://unpkg.com/@tag0/react-auth/dist/assets/images/logo.svg',
    logoTitle: 'ReactAuth'
  }
});

const App = () => (
  <Router>
    <AuthProvider service={authService}>
      <Switch>
        <Route path={authService.options.pathPrefix} component={AuthRouter} />
        <SecureRoute exact path="/home">
          <h1 style={{ margin: '1em', fontSize: '1.5rem' }}>Members Page</h1>
        </SecureRoute>
        <Redirect to="/home" />
      </Switch>
    </AuthProvider>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
