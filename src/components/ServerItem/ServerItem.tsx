import { styled } from 'styled-components';

import { ServerType } from '../../types';
import { ReactComponent as ServerImage } from './server.svg';

const ServerItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 20px;
  border: 1px solid ${({ theme }) => theme.color.blue};
  border-radius: 4px;
  gap: 10px;
`;

const ServerIcon = styled(ServerImage)`
  width: 30px;
  height: 30px;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ServerItem = ({ server }: { server: ServerType }) => (
  <ServerItemContainer key={`${server.name}-${server.distance}`}>
    <NameContainer>
      <ServerIcon />
      <span>{server.name}</span>
    </NameContainer>
    <span>{server.distance}</span>
  </ServerItemContainer>
);
