import { render, screen } from '@testing-library/react';

import { ServersPage } from './Servers';

test('renders servers page', () => {
  render(<ServersPage />);
  const loginElement = screen.getByText(/Servers/i);
  expect(loginElement).toBeInTheDocument();
});
