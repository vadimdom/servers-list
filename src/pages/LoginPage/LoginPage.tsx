import { LoginForm } from '../../components';
import { LoginWrapper } from './LoginPage.styles';

export const LoginPage = () => (
  <LoginWrapper data-testid="login-page">
    <LoginForm />
  </LoginWrapper>
);
