import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import 'jest-styled-components';

import { Profile } from './Profile';
import { ThemeProvider } from '../../theme';
import { BROKEN_DEFAULT_PROFILE_IMAGE, FALLBACK_IMAGE, DEFAULT_PROFILE_IMAGE } from '../../constants';
import { useAppSelector } from '../../redux';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

const mockedUseDispatch = jest.fn();

jest.mock('../../redux', () => ({
  ...jest.requireActual('../../redux'),
  useAppDispatch: () => mockedUseDispatch,
  useAppSelector: jest.fn(),
}));

const renderProfile = () => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <Profile />
      </ThemeProvider>
    </MemoryRouter>
  );
};

const localStorageMock = (() => {
  return {
    removeItem: () => null,
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('<Profile />', () => {
  beforeEach(async () => {
    (useAppSelector as jest.Mock).mockReturnValue({ name: 'User', image: DEFAULT_PROFILE_IMAGE });
  });
  afterEach(() => {
    (useAppSelector as jest.Mock).mockClear();
  });

  test('should logout on logout click', async () => {
    const localStorageRemoveItem = jest.spyOn(localStorage, 'removeItem');
    renderProfile();

    expect(screen.getByTestId('profile')).toMatchSnapshot();
    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => expect(localStorageRemoveItem).toBeCalledWith('token'));
    expect(mockedUseDispatch).toBeCalledWith({ payload: undefined, type: 'profile/removeUser' });
    expect(mockedUseNavigate).toBeCalledWith('/');
  });
  test('should display correct user image', () => {
    renderProfile();

    expect(useAppSelector).toHaveBeenCalled();
    expect((screen.getByTestId('profile-image') as HTMLImageElement).src).toBe(DEFAULT_PROFILE_IMAGE);
  });
  test('should display fallback image, if user image is broken', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ name: 'User', image: BROKEN_DEFAULT_PROFILE_IMAGE });

    renderProfile();

    fireEvent.error(screen.getByTestId('profile-image'));

    expect((screen.getByTestId('profile-image') as HTMLImageElement).src).toBe(FALLBACK_IMAGE);
  });
});
