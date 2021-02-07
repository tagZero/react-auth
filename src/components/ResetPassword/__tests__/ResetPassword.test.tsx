import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import AuthProvider from '../../AuthProvider/AuthProvider';
import ResetPassword from '../ResetPassword';

describe('ResetPassword', () => {
  const tree = () =>
    render(
      <Router>
        <AuthProvider>
          <ResetPassword />
        </AuthProvider>
      </Router>
    );

  test('renders properly', () => {
    const { asFragment } = tree();
    expect(asFragment()).toMatchSnapshot();
  });
});
