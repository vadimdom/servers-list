import { styled } from 'styled-components';

import { ReactComponent as ServerImage } from './server.svg';
import { DEVICE_SIZES } from '../../constants';

export const ServerItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 20px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 4px;
  gap: 10px;
  box-shadow: rgba(79, 192, 249, 0.24) 0px 3px 8px;
  transition: all 0.1s linear;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    box-shadow: rgba(79, 192, 249, 0.5) 0px 4px 15px;
    transform: translateY(1px);
    background: ${({ theme }) => theme.color.lightestBlue};
  }

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: 12px;
  }
`;

export const ServerIcon = styled(ServerImage)`
  width: 30px;
  height: 30px;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    display: none;
  }
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FlagContainer = styled.img`
  width: 20px;
  height: 20px;
`;

export const DistanceContainer = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
`;
