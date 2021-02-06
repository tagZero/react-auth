import { AuthService } from 'src'; // this would be import from '@tag0/react-auth';

class ExampleAuthService extends AuthService {
  token;

  isAuthenticated = (): boolean => {
    return !!this.token;
  };

  login = async ({ email, password }: { email: string; password: string }) => {
    if (email && password) {
      this.token = 'foo';
      this.setAuthData({ email, loginAt: Date.now() });
      this.setNotification({ type: 'success', message: 'Login success' });
      this.history.push('/home');
    } else {
      this.setNotification({ type: 'error', message: 'Login failed' });
    }
  };
}

export default ExampleAuthService;
