import { useNavigate } from 'react-router-dom';

import { useUserSession } from '../../hooks';
import { LoginForm, Loader } from '../../components';
import { LoginWrapper } from './LoginPage.styles';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isUserSessionActive } = useUserSession();

  if (isUserSessionActive) {
    navigate('/servers');
    return null;
  }

  return (
    <LoginWrapper data-testid="login-page">
      {isUserSessionActive === null ? <Loader data-testid="loader" $sizePX={100} /> : <LoginForm />}
    </LoginWrapper>
  );
};
