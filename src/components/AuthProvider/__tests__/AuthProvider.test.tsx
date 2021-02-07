import React from 'react';
import { render } from '@testing-library/react';
import AuthProvider from '../AuthProvider';

describe('AuthProvider', () => {
  const tree = () =>
    render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );

  test('renders properly', () => {
    const { asFragment } = tree();
    expect(asFragment()).toMatchSnapshot();
  });
});
