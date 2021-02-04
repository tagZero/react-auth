import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';

const SecureRoute = ({ children, ...props }: any) => {
  const { isAuthenticated, getModulePath, notification } = useAuth();

  useEffect(() => {
    if (notification) {
      const { type, message } = notification;
      toast[type](message);
    }
  }, [notification]);

  return isAuthenticated() ? (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Route {...props}>{children ? children : null}</Route>
    </div>
  ) : (
    <Redirect to={getModulePath('login')} />
  );
};

export default SecureRoute;
