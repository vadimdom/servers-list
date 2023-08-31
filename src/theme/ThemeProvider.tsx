import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { defaultTheme } from './defaultTheme';

type ThemeProviderProps = {
  children: ReactNode;
};
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <StyledThemeProvider theme={defaultTheme}>{children}</StyledThemeProvider>;
};
