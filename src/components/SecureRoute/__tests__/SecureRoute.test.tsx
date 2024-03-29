import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import SecureRoute from '../SecureRoute';
import AuthProvider from '../../AuthProvider/AuthProvider';

describe('SecureRoute', () => {
  const tree = () =>
    render(
      <Router>
        <AuthProvider isAuthenticated={() => true}>
          <SecureRoute>
            <h1>Home</h1>
          </SecureRoute>
        </AuthProvider>
      </Router>
    );

  test('renders properly', () => {
    const { asFragment } = tree();
    expect(asFragment()).toMatchSnapshot();
  });
});
