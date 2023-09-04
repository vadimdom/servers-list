import { ThemeProvider } from './theme';
import { Router } from './routing';
import { ReduxStoreProvider } from './redux';

export const App = () => (
  <ReduxStoreProvider>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </ReduxStoreProvider>
);
