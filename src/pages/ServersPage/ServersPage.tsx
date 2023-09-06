import { useEffect, useState } from 'react';

import { getServers } from '../../services';
import { CountryFilter, Loader, ServerItem, SortMarker } from '../../components';
import { Country, ServerType, SortRuleType } from '../../types';
import {
  PageWrapper,
  PageDescription,
  ServersList,
  Servers,
  ServersListHeader,
  ListHeader,
} from './ServersPage.styles';
import { ascendingSort, descendingSort } from '../../helpers';
import { COUNTRY_FULL_NAMES } from '../../constants';

export const ServersPage = () => {
  const [servers, setServers] = useState<ServerType[]>([]);
  const [filteredServers, setFilteredServers] = useState<ServerType[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [nameSortRule, setNameSortRule] = useState<SortRuleType>(null);
  const [distanceSortRule, setDistanceSortRule] = useState<SortRuleType>(null);

  useEffect(() => {
    const fetchServers = async () => {
      const result = await getServers();

      setIsLoaded(true);
      setServers(result);
    };

    fetchServers();
  }, []);

  useEffect(() => {
    if (selectedCountries.length) {
      const countryFullNames = selectedCountries.map((country) => COUNTRY_FULL_NAMES[country]);
      const serversFromSelectedCountries = servers.filter(
        (server) =>
          !!countryFullNames.filter((countryFullName) => server.name.toLowerCase().includes(countryFullName)).length
      );
      setFilteredServers(serversFromSelectedCountries);
    } else {
      setFilteredServers(servers);
    }
  }, [selectedCountries, servers]);

  const sortByName = () => {
    const sortedServers = [...servers].sort((a, b) =>
      nameSortRule === 'asc' ? descendingSort(a.name, b.name) : ascendingSort(a.name, b.name)
    );
    setNameSortRule((prevNameSortRule) => (prevNameSortRule === 'asc' ? 'desc' : 'asc'));
    setDistanceSortRule(null);
    setServers(sortedServers);
  };

  const sortByDistance = () => {
    const sortedServers = [...servers].sort((a, b) =>
      distanceSortRule === 'asc' ? descendingSort(a.distance, b.distance) : ascendingSort(a.distance, b.distance)
    );
    setDistanceSortRule((prevNameSortRule) => (prevNameSortRule === 'asc' ? 'desc' : 'asc'));
    setNameSortRule(null);
    setServers(sortedServers);
  };

  const onFlagSelect = (country: Country) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter((selCountry) => selCountry !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  return (
    <PageWrapper data-testid="servers-page">
      <PageDescription>Here is the list of all available servers:</PageDescription>
      {isLoaded ? (
        <ServersList>
          <CountryFilter
            selectedFlags={selectedCountries}
            onFlagClick={onFlagSelect}
            onClear={() => setSelectedCountries([])}
          />
          {filteredServers.length ? (
            <>
              <ServersListHeader>
                <ListHeader data-cy="sort-by-name" data-testid="sort-by-name" onClick={sortByName}>
                  <span>Name</span>
                  <SortMarker rule={nameSortRule} />
                </ListHeader>
                <ListHeader data-cy="sort-by-distance" data-testid="sort-by-distance" onClick={sortByDistance}>
                  <span>Distance</span>
                  <SortMarker rule={distanceSortRule} />
                </ListHeader>
              </ServersListHeader>
              <Servers data-cy="servers-list" data-testid="servers-list">
                {filteredServers.map((server) => (
                  <ServerItem key={`${server.name}-${server.distance}`} server={server} />
                ))}
              </Servers>
            </>
          ) : (
            <span>No available servers</span>
          )}
        </ServersList>
      ) : (
        <Loader data-testid="loader" $sizePX={100} />
      )}
    </PageWrapper>
  );
};
