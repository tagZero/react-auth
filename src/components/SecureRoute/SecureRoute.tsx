import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';

const SecureRoute = ({ children, ...props }: any) => {
  const { isAuthenticated, getModulePath } = useAuth();

  return isAuthenticated() ? (
    <Route {...props}>{children ? children : null}</Route>
  ) : (
    <Redirect to={getModulePath('login')} />
  );
};

export default SecureRoute;
