import React, { createContext, useContext, useState } from 'react';
import { AuthServiceType, NotificationState } from '../AuthService/AuthService.type';

const AuthContext = createContext({} as AuthServiceType);
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ service: AuthServiceType }> = ({ service, children }) => {
  const [authData, setAuthData] = useState();
  const [notification, setNotification] = useState<NotificationState>();

  const {
    login,
    logout,
    register,
    resetPassword,
    isAuthenticated,
    modules,
    options,
    getModulePath
  } = service;

  service.setNotification = setNotification;
  service.setAuthData = setAuthData;

  return (
    <AuthContext.Provider
      value={{
        authData,
        isAuthenticated,
        login,
        logout,
        register,
        resetPassword,
        modules,
        options,
        getModulePath,
        notification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
