export interface AuthServiceType {
  authData: any;
  modules: any;
  options: any;
  isAuthenticated: () => boolean;
  resetPassword: (props: any) => Promise<any>;
  login: (props: any) => Promise<any>;
  register: (props: any) => Promise<any>;
  logout: () => Promise<any>;
  getModulePath: (module: string) => string;
}
