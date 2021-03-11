import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { AuthProviderPropsType, AuthProviderType } from './AuthProvider.type';

const AuthContext = createContext({} as AuthProviderType);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({
  loadingState,
  login,
  logout,
  register,
  resetPassword,
  isAuthenticated: overrideIsAuthenticated,
  options: authOptions = {},
  modules: authModules = {},
  children
}: PropsWithChildren<AuthProviderPropsType>) => {
  const [loading, setLoading] = useState<boolean>(!!loadingState);
  const [token, setToken] = useState<string>();
  const [options, setOptions] = useState({
    ...authOptions,
    authRoute: authOptions?.authRoute || '/auth',
    authenticatedRoute: authOptions?.authenticatedRoute || '/user'
  });
  const [modules, setModules] = useState({
    ...authModules,
    login: {
      path: '/login',
      title: 'Login',
      text: 'I have an account',
      description: 'Please provide your credentials below to login',
      successMessage: 'Successful',
      ...authModules?.login
    },
    register: {
      path: '/register',
      title: 'Register',
      text: 'Create new account',
      description: 'Please provide information below to register a new user',
      termsAndConditions: 'I agree to all the',
      termsAndConditionsLink: '/tac',
      termsAndConditionsLinkText: 'terms and conditions',
      successMessage: 'Registration was successful. Please check your email address for activation email.',
      passwordPattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%&*?])[A-Za-z\\d!@#$%&*?]{8,}',
      passwordPatternMessage:
        'Please enter min. 8 characters having at least 1 capital letter, 1 lowercase letter, 1 number and 1 special character (!@#$%&*?)',
      ...authModules?.register
    },
    resetPassword: {
      path: '/reset-password',
      title: 'Reset password',
      text: 'Forgot password?',
      successMessage:
        'Password reset was successful. Please check your email address for password reset email.',
      description: 'Please provide your e-mail address to reset your password',
      ...authModules?.resetPassword
    }
  });

  useEffect(() => {
    if (!document.body.classList.contains('react-auth')) {
      document.body.classList.add('react-auth');
    }
  }, []);

  const isAuthenticated = (): boolean => {
    return !!token;
  };

  const getModulePath = (module: string) => {
    if (options.authRoute === '/') {
      return modules[module].path;
    }
    return options.authRoute + modules[module].path;
  };

  return (
    <AuthContext.Provider
      value={{
        getModulePath,
        isAuthenticated: overrideIsAuthenticated || isAuthenticated,
        loading,
        login,
        logout,
        modules,
        options,
        register,
        resetPassword,
        setLoading,
        setToken,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
