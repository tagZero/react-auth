import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import AuthProvider from '../../AuthProvider/AuthProvider';
import Register from '../Register';

describe('Register', () => {
  const tree = () =>
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );

  test('renders properly', () => {
    const { asFragment } = tree();
    expect(asFragment()).toMatchSnapshot();
  });
});
