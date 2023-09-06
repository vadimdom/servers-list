import { AVAILABLE_COUNTRY_CODES } from '../constants';

type LanguageTupleUppercase = typeof AVAILABLE_COUNTRY_CODES;

export type Country = LanguageTupleUppercase[number];
