import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserSession } from '../../hooks';
import { login } from '../../services';
import { Loader } from '../Loader';
import {
  FormContainer,
  Form,
  ErrorMessage,
  Input,
  Button,
  FormCaption,
  InputErrorMessage,
  InputContainer,
} from './LoginForm.styles';
import { useAppDispatch } from '../../redux';
import { setUser } from '../../redux/profileSlice';
import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from '../../constants';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isUserSessionActive } = useUserSession();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoginProcessing, setIsLoginProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  useEffect(() => {
    if (username && username.length < MIN_USERNAME_LENGTH) {
      setUsernameError(`Username should be at least ${MIN_USERNAME_LENGTH} characters`);
    } else {
      setUsernameError('');
    }
  }, [username, setUsernameError]);

  useEffect(() => {
    if (password && password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(`Password should be at least ${MIN_PASSWORD_LENGTH} characters`);
    } else {
      setPasswordError('');
    }
  }, [password, setPasswordError]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoginProcessing(true);

    const loginResult = await login({ username, password });

    if (loginResult.message) {
      setErrorMessage('Wrong username or/and password!');
      setIsLoginProcessing(false);
    } else if (loginResult.token) {
      localStorage.setItem('token', loginResult.token);
      dispatch(setUser({ name: username }));
      navigate('/servers');
    }
  };

  if (isUserSessionActive === null) return <Loader data-testid="loader" $sizePX={100} />;

  if (isUserSessionActive) {
    navigate('/servers');
    return null;
  }

  return (
    <FormContainer>
      <FormCaption>Login</FormCaption>
      <Form onSubmit={onSubmit}>
        <InputContainer>
          <Input
            aria-label="username-input"
            placeholder="Your username"
            value={username}
            $isWithError={!!usernameError || !!errorMessage}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
          <InputErrorMessage $isVisible={!!usernameError}>{usernameError}</InputErrorMessage>
        </InputContainer>
        <InputContainer>
          <Input
            aria-label="password-input"
            type="password"
            placeholder="Your password"
            value={password}
            $isWithError={!!passwordError || !!errorMessage}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <InputErrorMessage $isVisible={!!passwordError}>{passwordError}</InputErrorMessage>
        </InputContainer>
        <Button
          type="submit"
          disabled={isLoginProcessing || !!usernameError || !!passwordError || !username || !password}
        >
          {isLoginProcessing ? <Loader data-testid="sign-in-loader" $sizePX={16} /> : 'Sign In'}
        </Button>
      </Form>
      <ErrorMessage $isVisible={!!errorMessage}>{errorMessage}</ErrorMessage>
    </FormContainer>
  );
};
