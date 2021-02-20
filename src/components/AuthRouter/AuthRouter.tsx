import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ResetPassword from '../ResetPassword/ResetPassword';
import '../../styles/react-auth.css';
import '../../styles/loader.css';

const AuthRouter = () => {
  const { loading, modules, options, getModulePath, isAuthenticated } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated()) {
      history.push(options.securedRoute);
    }
  }, [history, isAuthenticated, options.securedRoute]);

  const getComponent = (name: string) => {
    switch (name) {
      case 'login': {
        return <Login />;
      }
      case 'register': {
        return <Register />;
      }
      case 'resetPassword': {
        return <ResetPassword />;
      }
      // no default
    }
  };

  return (
    <Switch>
      {Object.keys(modules).map((moduleName) => (
        <Route key={moduleName} exact path={getModulePath(moduleName)}>
          <div className="react-auth">
            {loading ? (
              <div className="loading-container">
                <h2>Loading, please wait.</h2>
                <div className="loading" />
              </div>
            ) : (
              getComponent(moduleName)
            )}
          </div>
        </Route>
      ))}
      <Redirect to={getModulePath('login')} />
    </Switch>
  );
};

export default AuthRouter;
