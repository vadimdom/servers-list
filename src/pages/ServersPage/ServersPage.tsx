import { useEffect, useState } from 'react';

import { getServers } from '../../services';
import { Loader, ServerItem, SortMarker } from '../../components';
import { ServerType, SortRuleType } from '../../types';
import {
  PageWrapper,
  PageDescription,
  ServersList,
  Servers,
  ServersListHeader,
  ListHeader,
} from './ServersPage.styles';
import { ascendingSort, descendingSort } from '../../helpers';

export const ServersPage = () => {
  const [servers, setServers] = useState<ServerType[]>([]);
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

  return (
    <PageWrapper data-testid="servers-page">
      <PageDescription>Here is the list of all available servers:</PageDescription>
      {isLoaded ? (
        <ServersList>
          {servers.length ? (
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
                {servers.map((server) => (
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
