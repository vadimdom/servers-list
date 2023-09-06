import { COUNTRY_FLAGS } from '../constants';

export const getFlagByCountryName = (name: string): string => {
  const countryName = name.toLowerCase();
  if (countryName.includes('germany')) {
    return COUNTRY_FLAGS.DE;
  } else if (countryName.includes('japan')) {
    return COUNTRY_FLAGS.JA;
  } else if (countryName.includes('united states')) {
    return COUNTRY_FLAGS.US;
  } else if (countryName.includes('united kingdom')) {
    return COUNTRY_FLAGS.UK;
  } else {
    return '';
  }
};
