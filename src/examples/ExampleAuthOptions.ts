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
      authContext.setNotification({ type: 'success', message: 'Login successful' });
      await Promise.resolve();
    } else {
      authContext.setNotification({ type: 'error', message: 'Login failed' });
      await Promise.reject();
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
