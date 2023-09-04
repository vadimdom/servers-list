import { styled } from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 30px;
`;

export const PageDescription = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const ServersList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.color.blue};
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
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
  border-bottom: 1px solid ${({ theme }) => theme.color.blue};
  padding-bottom: 10px;
`;

export const ListHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
