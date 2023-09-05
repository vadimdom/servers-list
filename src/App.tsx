import { ThemeProvider } from './theme';
import { Router } from './routing';
import { ReduxStoreProvider } from './redux';
import { AppWrapper } from './App.styles';

export const App = () => (
  <AppWrapper>
    <ReduxStoreProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </ReduxStoreProvider>
  </AppWrapper>
);
