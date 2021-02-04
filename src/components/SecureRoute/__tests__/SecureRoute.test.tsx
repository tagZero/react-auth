import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import SecureRoute from '../SecureRoute';
import AuthProvider from '../../AuthProvider/AuthProvider';
import AuthService from '../../AuthService/AuthService';

class MockService extends AuthService {
  isAuthenticated = jest.fn();
}

describe('SecureRoute', () => {
  const service = new MockService();
  const tree = () =>
    render(
      <Router>
        <AuthProvider service={service}>
          <SecureRoute>
            <h1>Home</h1>
          </SecureRoute>
        </AuthProvider>
      </Router>
    );

  test('renders properly', () => {
    service.isAuthenticated.mockReturnValueOnce(true);
    const { asFragment } = tree();
    expect(asFragment()).toMatchSnapshot();
  });
});
