import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../AuthProvider/AuthProvider';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ResetPassword from '../ResetPassword/ResetPassword';
import '../../styles/reset.css';
import '../../styles/font.css';
import '../../styles/main.css';
import '../../styles/react-toastify.css';

const AuthRouter = () => {
  const { modules, getModulePath, notification } = useAuth();

  useEffect(() => {
    if (notification) {
      const { type, message } = notification;
      toast[type](message);
    }
  }, [notification]);

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
          <div>
            <ToastContainer
              position="top-right"
              autoClose={7000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {getComponent(moduleName)}
          </div>
        </Route>
      ))}
      <Redirect to={getModulePath('login')} />
    </Switch>
  );
};

export default AuthRouter;
