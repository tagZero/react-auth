export type NotificationType = 'info' | 'warn' | 'error' | 'success';

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
}

export interface AuthProviderType extends AuthProviderPropsType {
  authData?: any;
  getModulePath: (module: string) => string;
  notification?: any;
  setAuthData?: (props: any) => any;
  setModules?: (props: any) => any;
  setNotification?: (props: NotificationState) => void;
  setOptions?: (props: any) => any;
  setToken?: (token: string | null) => any;
  token?: string | null;
}

export interface NotificationState {
  type: NotificationType;
  message: string;
}
