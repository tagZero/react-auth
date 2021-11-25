import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ResetPassword from '../ResetPassword/ResetPassword';
import ChangePassword from '../ChangePassword/ChangePassword';
import Activate from '../Activate/Activate';
import '../../styles/react-auth.css';
import CaptchaProvider from '../CaptchaProvider/CaptchaProvider';

const AuthRouter = () => {
  const { modules, options, getModulePath, isAuthenticated, captchaOptions } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated()) {
      history.push(options.securedRoute);
    }
  }, [history, isAuthenticated, options.securedRoute]);

  const getComponent = (name: string) => {
    switch (name) {
      case 'login': {
        return (
          <CaptchaProvider options={captchaOptions}>
            <Login />
          </CaptchaProvider>
        );
      }
      case 'register': {
        return <Register />;
      }
      case 'resetPassword': {
        return (
          <CaptchaProvider options={captchaOptions}>
            <ResetPassword />
          </CaptchaProvider>
        );
      }
      case 'changePassword': {
        return <ChangePassword />;
      }
      case 'activate': {
        return <Activate />;
      }
      // no default
    }
  };

  return (
    <Switch>
      {Object.keys(modules).map((moduleName) => (
        <Route key={moduleName} exact path={getModulePath(moduleName)}>
          <div className="react-auth">{getComponent(moduleName)}</div>
        </Route>
      ))}
      <Redirect to={getModulePath('login')} />
    </Switch>
  );
};

export default AuthRouter;
