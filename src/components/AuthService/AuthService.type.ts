export type NotificationType = 'info' | 'warn' | 'error' | 'success';

export interface AuthServiceType {
  authData?: any;
  modules: any;
  options: any;
  notification?: any;
  isAuthenticated: () => boolean;
  setNotification?: (props: NotificationState) => void;
  setAuthData?: (props: any) => any;
  resetPassword: (props: any) => Promise<any>;
  login: (props: any) => Promise<any>;
  register: (props: any) => Promise<any>;
  logout: () => Promise<any>;
  getModulePath: (module: string) => string;
}

export interface NotificationState {
  type: NotificationType;
  message: string;
}
