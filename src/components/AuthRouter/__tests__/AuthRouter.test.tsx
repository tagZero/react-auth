import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AuthService from '../../AuthService/AuthService';
import AuthProvider from '../../AuthProvider/AuthProvider';
import AuthRouter from '../AuthRouter';

class MockService extends AuthService {
  isAuthenticated = jest.fn();
}

describe('AuthRouter', () => {
  const service = new MockService();
  const tree = () =>
    render(
      <Router>
        <AuthProvider service={service}>
          <AuthRouter />
        </AuthProvider>
      </Router>
    );

  afterEach(() => jest.clearAllMocks());

  test('renders login', () => {
    const { getByText } = tree();
    expect(getByText('Please provide your credentials below to login.')).toBeDefined();
  });

  test('renders register', async () => {
    const { getByText } = tree();
    fireEvent.click(getByText('Create new account'));
    await waitFor(() =>
      expect(getByText('Please provide information below to register a new user.')).toBeDefined()
    );
  });

  test('renders reset password', async () => {
    const { getByText } = tree();
    fireEvent.click(getByText('Forgot password?'));
    await waitFor(() =>
      expect(getByText('Please provide your e-mail address to reset your password.')).toBeDefined()
    );
  });
});
