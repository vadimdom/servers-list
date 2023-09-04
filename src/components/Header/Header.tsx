import { styled } from 'styled-components';

import { ReactComponent as CompanyImage } from './company.svg';
import { Profile } from '../Profile';

const HeaderContainer = styled.div`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.color.gray};
`;

const CompanyIcon = styled(CompanyImage)`
  width: 50px;
  height: 50px;
`;

export const Header = () => (
  <HeaderContainer>
    <CompanyIcon />
    <Profile />
  </HeaderContainer>
);
