import { SyntheticEvent } from 'react';
import { FALLBACK_IMAGE } from '../../constants';
import { getColorByDistance, getFlagByCountryName } from '../../helpers';
import { ServerType } from '../../types';
import { ServerItemContainer, FlagContainer, ServerIcon, NameContainer, DistanceContainer } from './ServerItem.styles';

export const ServerItem = ({ server }: { server: ServerType }) => (
  <ServerItemContainer data-cy="server-item" key={`${server.name}-${server.distance}`}>
    <NameContainer>
      <ServerIcon />
      <FlagContainer
        src={getFlagByCountryName(server.name)}
        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = FALLBACK_IMAGE)}
      />
      <span data-cy="server-name">{server.name}</span>
    </NameContainer>
    <DistanceContainer data-cy="server-distance" $color={getColorByDistance(server.distance)}>
      {server.distance}
    </DistanceContainer>
  </ServerItemContainer>
);
