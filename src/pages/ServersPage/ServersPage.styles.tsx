import { styled } from 'styled-components';
import { DEVICE_SIZES } from '../../constants';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 30px 50px 30px;
  min-height: 100vh;
`;

export const PageDescription = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.color.darkBlue};
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 10px;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: 16px;
  }
`;

export const ServersList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: rgba(255, 255, 255, 0.6);
  color: ${({ theme }) => theme.color.darkBlue};
  border-radius: 8px;
  width: 100%;
  max-width: 600px;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    max-width: 80%;
    padding: 10px;
  }
`;

export const Servers = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  gap: 8px;
`;

export const ServersListHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ListHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: 14px;
  }
`;
