import { ThemeProvider } from './theme';
import { Router } from './routing';

export const App = () => (
  <ThemeProvider>
    <Router />
  </ThemeProvider>
);
