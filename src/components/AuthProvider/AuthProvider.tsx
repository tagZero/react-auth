import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { AuthProviderPropsType, AuthProviderType } from './AuthProvider.type';

const AuthContext = createContext({} as AuthProviderType);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({
  login,
  logout,
  register,
  resetPassword,
  changePassword,
  activate,
  isAuthenticated: overrideIsAuthenticated,
  options: authOptions = {},
  modules: authModules = {},
  messageProvider,
  captchaOptions = {
    enabled: true,
    maxFailureCount: 5,
    siteKey: null
  },
  children
}: PropsWithChildren<AuthProviderPropsType>) => {
  const [token, setToken] = useState<string>();
  const [options, setOptions] = useState({
    ...authOptions,
    authRoute: authOptions?.authRoute || '/auth',
    authenticatedRoute: authOptions?.authenticatedRoute || '/user',
    passwordAgain: authOptions?.passwordAgain ? authOptions?.passwordAgain : false
  });
  const [modules, setModules] = useState({
    ...authModules,
    login: {
      path: '/login',
      title: 'Login',
      text: 'Sign in',
      description: 'Please provide your credentials below to login',
      failureMessage:
        'Login failed. Please check your credentials and make sure that activated your account.',
      ...authModules?.login
    },
    register: {
      path: '/register',
      title: 'Register',
      text: 'Create an account',
      description: 'Please provide information below to register a new user',
      termsAndConditions: 'I agree to the',
      termsAndConditionsLink: '/terms-and-conditions',
      termsAndConditionsLinkText: 'Terms & Conditions',
      privacyPolicyLink: '/privacy-policy',
      privacyPolicyLinkText: 'Privacy Policy',
      successMessage: 'Registration was successful. Please check your email address for activation email.',
      passwordPattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%&*?])[A-Za-z\\d!@#$%&*?]{8,}',
      passwordPatternMessage:
        'Passwords must be at least 8 characters long and it should contain at least 1 capital letter, 1 lowercase letter, 1 number and 1 special character (!@#$%&*?)',
      ...authModules?.register
    },
    resetPassword: {
      path: '/reset-password',
      title: 'Reset password',
      text: 'Forgot password?',
      successMessage: "Password reset instructions will be sent to your email address if it's registered.",
      description: 'Please provide your e-mail address to reset password',
      ...authModules?.resetPassword
    },
    changePassword: {
      path: '/change-password',
      title: 'Set your password',
      successMessage: 'You have successfully changed your password. You can log in with your new password.',
      description: 'Please provide a new password and confirm it.',
      passwordPattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%&*?])[A-Za-z\\d!@#$%&*?]{8,}',
      passwordPatternMessage:
        'Passwords must be at least 8 characters long and it should contain at least 1 capital letter, 1 lowercase letter, 1 number and 1 special character (!@#$%&*?)',
      ...authModules?.changePassword
    },
    activate: {
      path: '/activate',
      title: 'Account activation',
      successMessage: 'You have successfully activated your account. You can log in now.',
      description: 'Please wait...',
      ...authModules?.activate
    }
  });

  useEffect(() => {
    if (!document.body.classList.contains('react-auth')) {
      document.body.classList.add('react-auth');
    }
  }, []);

  const isAuthenticated = (): boolean => !!token;

  const getModulePath = (module: string) => {
    if (options.authRoute === '/') {
      return modules[module].path;
    }
    return options.authRoute + modules[module].path;
  };

  const notify = (notification) => {
    if (messageProvider) {
      return messageProvider(notification);
    } else {
      if (notification.type === 'error') {
        console.error(notification.message);
      } else {
        console.log(notification.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getModulePath,
        isAuthenticated: overrideIsAuthenticated || isAuthenticated,
        activate,
        login,
        logout,
        modules,
        options,
        register,
        resetPassword,
        changePassword,
        setToken,
        notify,
        token,
        captchaOptions
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
