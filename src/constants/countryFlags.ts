import deFlag from './img/de.svg';
import jaFlag from './img/ja.svg';
import usFlag from './img/us.svg';
import ukFlag from './img/uk.svg';

import { Country } from '../types';

export const COUNTRY_FLAGS: { [key in Country]: string } = {
  UK: ukFlag,
  US: usFlag,
  DE: deFlag,
  JA: jaFlag,
};
