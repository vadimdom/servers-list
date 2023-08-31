import { useState, FormEvent, ChangeEvent } from 'react';

import { login } from '../services';
import { Loader } from './Loader';
import { FormContainer, Form, ErrorMessage, Input, Button } from './LoginForm.styles';

export const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoginProcessing, setIsLoginProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoginProcessing(true);

    const loginResult = await login({ username, password });

    if (loginResult.message) {
      setErrorMessage('Wrong username or/and password!');
    } else {
      // @TODO: implement token set
      setErrorMessage('');
    }

    setIsLoginProcessing(false);
  };

  return (
    <FormContainer>
      <span>Login</span>
      <Form onSubmit={onSubmit}>
        <Input
          placeholder="Your username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={isLoginProcessing}>
          {isLoginProcessing ? <Loader $sizePX={16} /> : 'Sign In'}
        </Button>
      </Form>
      <ErrorMessage $isVisible={!!errorMessage}>{errorMessage}</ErrorMessage>
    </FormContainer>
  );
};
