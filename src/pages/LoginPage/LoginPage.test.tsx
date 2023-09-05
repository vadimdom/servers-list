import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { LoginPage } from './LoginPage';
import { ThemeProvider } from '../../theme';
import { MemoryRouter } from 'react-router-dom';
import { useUserSession } from '../../hooks';
import { login } from '../../services';
import { DEFAULT_PROFILE_IMAGE } from '../../constants';

jest.mock('../../hooks');
jest.mock('../../services');

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

const mockedUseDispatch = jest.fn();

jest.mock('../../redux', () => ({
  ...jest.requireActual('../../redux'),
  useAppDispatch: () => mockedUseDispatch,
}));

const renderLoginPage = () => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <LoginPage />
      </ThemeProvider>
    </MemoryRouter>
  );
};

const localStorageMock = (() => {
  return {
    setItem: () => null,
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('<LoginPage />', () => {
  beforeEach(async () => {
    (useUserSession as jest.Mock).mockReturnValue({ isUserSessionActive: false });
    (login as jest.Mock).mockReturnValue({ message: 'Error' });
  });
  afterEach(async () => {
    (useUserSession as jest.Mock).mockClear();
    (login as jest.Mock).mockClear();
  });

  test('renders only loader if isUserSessionActive = null', () => {
    (useUserSession as jest.Mock).mockReturnValue({ isUserSessionActive: null });

    renderLoginPage();
    const loaderElement = screen.getByTestId('loader');

    expect(loaderElement).toBeInTheDocument();
    expect(screen.getByTestId('login-page')).not.toHaveTextContent(/Login/i);
  });
  test('redirect to /servers if isUserSessionActive = true', () => {
    (useUserSession as jest.Mock).mockReturnValue({ isUserSessionActive: true });

    renderLoginPage();

    expect(mockedUseNavigate).toBeCalledWith('/servers');
  });
  test('renders login form', () => {
    renderLoginPage();

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
  test('change input values', () => {
    renderLoginPage();

    const usernameInput: HTMLInputElement = screen.getByLabelText('username-input');
    const passwordInput: HTMLInputElement = screen.getByLabelText('password-input');

    fireEvent.change(usernameInput, { target: { value: 'User' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass' } });

    expect(usernameInput.value).toBe('User');
    expect(passwordInput.value).toBe('Pass');
  });
  test('sign in button should be disabled and display loader on click', async () => {
    renderLoginPage();
    const usernameInput: HTMLInputElement = screen.getByLabelText('username-input');
    const passwordInput: HTMLInputElement = screen.getByLabelText('password-input');

    fireEvent.change(usernameInput, { target: { value: 'User' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass' } });

    const signInButton: HTMLButtonElement = screen.getByRole('button');

    fireEvent.click(signInButton);

    expect(signInButton.disabled).toBeTruthy();
    expect(screen.getByTestId('sign-in-loader')).toBeVisible();
    await waitFor(() => expect(signInButton).toHaveTextContent('Sign In'));
  });
  test('call login with correct params and display error', async () => {
    renderLoginPage();

    const usernameInput: HTMLInputElement = screen.getByLabelText('username-input');
    const passwordInput: HTMLInputElement = screen.getByLabelText('password-input');
    const signInButton: HTMLButtonElement = screen.getByRole('button');

    fireEvent.change(usernameInput, { target: { value: 'User' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass' } });

    fireEvent.click(signInButton);

    expect(login).toBeCalledWith({ username: 'User', password: 'Pass' });
    await waitFor(() => expect(screen.getByText('Wrong username or/and password!')).toBeInTheDocument());
  });
  test('set token to localStorage and navigate to /servers', async () => {
    (login as jest.Mock).mockReturnValue({ token: '123123' });
    const localStorageSetItem = jest.spyOn(localStorage, 'setItem');

    renderLoginPage();

    const usernameInput: HTMLInputElement = screen.getByLabelText('username-input');
    const passwordInput: HTMLInputElement = screen.getByLabelText('password-input');
    const signInButton: HTMLButtonElement = screen.getByRole('button');

    fireEvent.change(usernameInput, { target: { value: 'User' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass' } });

    fireEvent.click(signInButton);

    expect(login).toBeCalledWith({ username: 'User', password: 'Pass' });
    await waitFor(() => expect(localStorageSetItem).toBeCalledWith('token', '123123'));
    expect(mockedUseDispatch).toBeCalledWith({
      payload: { name: 'User' },
      type: 'profile/setUser',
    });
    expect(mockedUseNavigate).toBeCalledWith('/servers');
  });
});
