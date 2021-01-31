import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ResetPassword from '../ResetPassword/ResetPassword';

const AuthRouter = () => {
  const { modules, getModulePath } = useAuth();

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
          {getComponent(moduleName)}
        </Route>
      ))}
      <Redirect to={getModulePath('login')} />
    </Switch>
  );
};

export default AuthRouter;
