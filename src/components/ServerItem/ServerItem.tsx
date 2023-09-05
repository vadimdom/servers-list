import { getColorByDistance } from '../../helpers';
import { ServerType } from '../../types';
import { ServerItemContainer, ServerIcon, NameContainer, DistanceContainer } from './ServerItem.styles';

export const ServerItem = ({ server }: { server: ServerType }) => (
  <ServerItemContainer key={`${server.name}-${server.distance}`}>
    <NameContainer>
      <ServerIcon />
      <span>{server.name}</span>
    </NameContainer>
    <DistanceContainer $color={getColorByDistance(server.distance)}>{server.distance}</DistanceContainer>
  </ServerItemContainer>
);
