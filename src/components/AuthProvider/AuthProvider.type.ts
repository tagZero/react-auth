export interface LoginPropsType {
  email: string;
  password: string;
  captchaToken?: string;
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
  resetPassword?: (
    props: { email: string; captchaToken?: string },
    context?: AuthProviderType
  ) => Promise<any>;
  changePassword?: (props: { password: string; token: string }, context?: AuthProviderType) => Promise<any>;
  activate?: (props: { token: string }, context?: AuthProviderType) => Promise<any>;
  modules?: any;
  options?: any;
  messageProvider?: any;
  captchaOptions?: any;
}

export interface AuthProviderType extends AuthProviderPropsType {
  getModulePath: (module: string) => string;
  setToken?: (token: string | null) => any;
  notify?: any;
  token?: string | null;
}
