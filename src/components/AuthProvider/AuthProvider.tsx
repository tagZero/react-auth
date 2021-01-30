import React, { createContext, useContext, useState } from 'react';
import { AuthServiceType } from '../AuthService/AuthService.type';

const AuthContext = createContext({} as AuthServiceType);
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ service: AuthServiceType }> = ({ service, children }) => {
  const [authData, setAuthData] = useState();

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
        getModulePath
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
