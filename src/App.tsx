import { ThemeProvider } from './theme';
import { AppRouter } from './AppRouter';

export const App = () => (
  <ThemeProvider>
    <AppRouter />
  </ThemeProvider>
);
