import { render, screen } from '@testing-library/react';

import { LoginPage } from './Login';

test('renders login page', () => {
  render(<LoginPage />);
  const loginElement = screen.getByText(/Login/i);
  expect(loginElement).toBeInTheDocument();
});
