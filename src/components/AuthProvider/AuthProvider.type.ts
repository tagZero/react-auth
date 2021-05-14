export interface LoginPropsType {
  email: string;
  password: string;
}

export interface RegisterPropsType extends LoginPropsType {
  firstName: string;
  lastName: string;
  birthDate: number;
}

export interface AuthProviderPropsType {
  isAuthenticated?: () => boolean;
  login?: (props: LoginPropsType, context?: AuthProviderType) => Promise<any>;
  logout?: (context?: AuthProviderType) => Promise<any>;
  register?: (props: RegisterPropsType, context?: AuthProviderType) => Promise<any>;
  resetPassword?: (props: { email: string }, context?: AuthProviderType) => Promise<any>;
  modules?: any;
  options?: any;
  messageProvider?: any;
}

export interface AuthProviderType extends AuthProviderPropsType {
  getModulePath: (module: string) => string;
  setToken?: (token: string | null) => any;
  notify?: any;
  token?: string | null;
}
