import { Country } from '../types';

export const AVAILABLE_COUNTRY_CODES = ['UK', 'US', 'DE', 'JA'] as const;

export const COUNTRY_FULL_NAMES: { [key in Country]: string } = {
  UK: 'united kingdom',
  US: 'united states',
  DE: 'germany',
  JA: 'japan',
};
