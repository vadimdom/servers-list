import { SyntheticEvent } from 'react';
import { AVAILABLE_COUNTRY_CODES, COUNTRY_FLAGS, FALLBACK_IMAGE } from '../../constants';
import { Country } from '../../types';
import { CountriesContainer, FlagContainer, FlagsContainer, ClearImage } from './CountryFilter.styles';

export const CountryFilter = ({
  selectedFlags,
  onFlagClick,
  onClear,
}: {
  selectedFlags: Country[];
  onFlagClick: (country: Country) => void;
  onClear: () => void;
}) => (
  <CountriesContainer>
    <span>Filter by countries:</span>
    <FlagsContainer data-testid="country-flags">
      {AVAILABLE_COUNTRY_CODES.map((flag) => (
        <FlagContainer
          $isSelected={selectedFlags.includes(flag)}
          onClick={() => onFlagClick(flag)}
          key={`country-flag-${flag}`}
          src={COUNTRY_FLAGS[flag]}
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = FALLBACK_IMAGE)}
        />
      ))}
      {!!selectedFlags.length && <ClearImage onClick={onClear} />}
    </FlagsContainer>
  </CountriesContainer>
);
