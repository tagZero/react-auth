import { AuthServiceType } from './AuthService.type';

class AuthServiceClass implements AuthServiceType {
  authData: any = null;
  modules: any = null;
  options: any = null;

  constructor(props?: { options?: any; modules?: any }) {
    if (props?.options?.pathPrefix) {
      if (props.options.pathPrefix[0] !== '/') {
        throw new Error(
          'AuthService pathPrefix should be empty string "" or it should start with "/" character.'
        );
      }
    }

    this.options = {
      ...props?.options,
      pathPrefix: props?.options.pathPrefix || '/auth'
    };
    this.modules = {
      ...props?.modules,
      login: {
        path: '/login',
        title: 'Login',
        text: 'I have an account',
        description: 'Please provide your credentials below to login.',
        ...props?.modules?.login
      },
      register: {
        path: '/register',
        title: 'Register',
        text: 'Create new account',
        description: 'Please provide information below to register a new user.',
        passwordPattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%&*?])[A-Za-z\\d!@#$%&*?]{8,}',
        passwordPatternMessage:
          'Please enter min. 8 characters having at least 1 capital letter, 1 lowercase letter, 1 number and 1 special character (!@#$%&*?)',
        ...props?.modules?.register
      },
      resetPassword: {
        path: '/reset-password',
        title: 'Reset password',
        text: 'Forgot password?',
        description: 'Please provide your e-mail address to reset your password.',
        ...props?.modules?.resetPassword
      }
    };
  }

  getModulePath = (module: string) => {
    if (this.options.pathPrefix === '/') {
      return this.modules[module].path;
    }
    return this.options.pathPrefix + this.modules[module].path;
  };

  resetPassword = ({ email }: { email: string }): Promise<any> => {
    console.log({ email });
    return Promise.resolve();
  };

  isAuthenticated = (): boolean => {
    return false;
  };

  login = ({ email, password }: { email: string; password: string }): Promise<any> => {
    console.log({ email, password });
    return Promise.resolve();
  };

  logout = (): Promise<any> => {
    return Promise.resolve();
  };

  register = ({ firstName, lastName, email, password }: any): Promise<any> => {
    console.log({ firstName, lastName, email, password });
    return Promise.resolve();
  };
}

export default AuthServiceClass;
