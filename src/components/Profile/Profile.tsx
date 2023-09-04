import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../redux';
import { removeUser, selectUser } from '../../redux/profileSlice';

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
      <ProfileImage src={user?.image} />
    </ProfileContainer>
  );
};
