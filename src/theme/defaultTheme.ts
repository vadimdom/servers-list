import { COLORS } from '../constants';

export const defaultTheme = {
  color: { ...COLORS },
};

export type Theme = typeof defaultTheme;
