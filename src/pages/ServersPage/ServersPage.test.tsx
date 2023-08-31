import { render, screen } from '@testing-library/react';

import { ServersPage } from './ServersPage';
import { ThemeProvider } from '../../theme';

test('renders servers page', () => {
  render(
    <ThemeProvider>
      <ServersPage />
    </ThemeProvider>
  );
  const loginElement = screen.getByText(/Servers/i);
  expect(loginElement).toBeInTheDocument();
});
