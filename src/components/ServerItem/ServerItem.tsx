import { getColorByDistance } from '../../helpers';
import { ServerType } from '../../types';
import { ServerItemContainer, ServerIcon, NameContainer, DistanceContainer } from './ServerItem.styles';

export const ServerItem = ({ server }: { server: ServerType }) => (
  <ServerItemContainer data-cy="server-item" key={`${server.name}-${server.distance}`}>
    <NameContainer>
      <ServerIcon />
      <span data-cy="server-name">{server.name}</span>
    </NameContainer>
    <DistanceContainer data-cy="server-distance" $color={getColorByDistance(server.distance)}>
      {server.distance}
    </DistanceContainer>
  </ServerItemContainer>
);
