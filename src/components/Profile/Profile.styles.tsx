import { styled } from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
`;

export const ImageAndNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.blue};
`;

export const LogoutContainer = styled.span`
  cursor: pointer;
  transition: color 0.2s linear;

  &:hover {
    color: ${({ theme }) => theme.color.blue};
  }
`;
