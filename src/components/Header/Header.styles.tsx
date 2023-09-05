import { styled } from 'styled-components';

import { ReactComponent as CompanyImage } from './company.svg';

export const HeaderContainer = styled.div`
  position: absolute;
  padding: 10px 30px;
  width: calc(100% - 60px);
  color: ${({ theme }) => theme.color.darkBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: rgba(255, 255, 255, 0.7) -10px 8px 20px;
`;

export const CompanyIcon = styled(CompanyImage)`
  width: 50px;
  height: 50px;
`;
