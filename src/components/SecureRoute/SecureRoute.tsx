import React, { PropsWithChildren, ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { useAuth } from '../AuthProvider/AuthProvider';

const SecureRoute = ({ children, ...props }: PropsWithChildren<RouteProps>) => {
  const { isAuthenticated, getModulePath } = useAuth();

  return isAuthenticated() ? <Route {...props}>{children}</Route> : <Redirect to={getModulePath('login')} />;
};

export default SecureRoute;
