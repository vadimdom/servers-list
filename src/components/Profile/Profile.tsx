import { useNavigate } from 'react-router-dom';
import { SyntheticEvent } from 'react';

import { useAppDispatch, useAppSelector, removeUser, selectUser } from '../../redux';
import { DEFAULT_PROFILE_IMAGE, FALLBACK_IMAGE } from '../../constants';
import { ProfileImage, LogoutContainer, ProfileContainer, ImageAndNameContainer } from './Profile.styles';

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
      <LogoutContainer data-cy="logout" onClick={onLogout}>
        Logout
      </LogoutContainer>
      <ImageAndNameContainer>
        <ProfileImage
          data-testid="profile-image"
          src={user?.image || DEFAULT_PROFILE_IMAGE}
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = FALLBACK_IMAGE)}
        />
        <span>{user?.name}</span>
      </ImageAndNameContainer>
    </ProfileContainer>
  );
};
