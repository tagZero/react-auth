export default {
  options: {
    securedRoute: '/user',
    authRoute: '/auth',
    logoUrl: 'https://unpkg.com/@tag0/react-auth/dist/assets/images/logo.svg',
    logoTitle: 'ReactAuth'
  },
  login: async ({ email, password }, authContext) => {
    if (email && password) {
      authContext.setToken('foo');
      await Promise.resolve();
    } else {
      await Promise.reject('Login failed');
    }
  },
  logout: async (authContext) => {
    await Promise.resolve();
  },
  register: async ({ firstName, lastName, birthDate, email, password }, authContext) => {
    await Promise.resolve();
  },
  resetPassword: async ({ email }, authContext) => {
    await Promise.resolve();
  }
};
