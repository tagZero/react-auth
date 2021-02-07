import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import AuthProvider from '../../AuthProvider/AuthProvider';
import Login from '../Login';

describe('Login', () => {
  const tree = () =>
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

  test('renders properly', () => {
    const { asFragment } = tree();
    expect(asFragment()).toMatchSnapshot();
  });
});
