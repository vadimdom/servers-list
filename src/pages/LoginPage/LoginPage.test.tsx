import { render, screen } from '@testing-library/react';

import { LoginPage } from './LoginPage';
import { ThemeProvider } from '../../theme';

test('renders login page', () => {
  render(
    <ThemeProvider>
      <LoginPage />
    </ThemeProvider>
  );
  const loginElement = screen.getByText(/Login/i);
  expect(loginElement).toBeInTheDocument();
});
