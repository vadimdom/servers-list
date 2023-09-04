import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { SyntheticEvent } from 'react';

import { useAppDispatch, useAppSelector, removeUser, selectUser } from '../../redux';
import { DEFAULT_PROFILE_IMAGE, FALLBACK_IMAGE } from '../../constants';

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.blue};
`;

const LogoutContainer = styled.span`
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onLogout = () => {
    localStorage.removeItem('token');
    dispatch(removeUser());
    navigate('/');
  };

  return (
    <ProfileContainer>
      <LogoutContainer onClick={onLogout}>Logout</LogoutContainer>
      <ProfileImage
        data-testid="profile-image"
        src={user?.image || DEFAULT_PROFILE_IMAGE}
        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = FALLBACK_IMAGE)}
      />
    </ProfileContainer>
  );
};
