import React from 'react';
import { render } from '@testing-library/react';
import AuthProvider from '../AuthProvider';
import AuthService from '../../AuthService/AuthService';

describe('AuthProvider', () => {
  const service = new AuthService();
  const tree = () =>
    render(
      <AuthProvider service={service}>
        <div>Test</div>
      </AuthProvider>
    );

  test('renders properly', () => {
    const { asFragment } = tree();
    expect(asFragment()).toMatchSnapshot();
  });
});
