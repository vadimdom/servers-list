import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { Profile } from './Profile';
import { ThemeProvider } from '../../theme';
import { MemoryRouter } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

const mockedUseDispatch = jest.fn();
const mockedUseSelector = jest.fn();

jest.mock('../../redux', () => ({
  ...jest.requireActual('../../redux'),
  useAppDispatch: () => mockedUseDispatch,
  useAppSelector: () => mockedUseSelector,
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
    mockedUseSelector.mockReturnValue({ name: 'User' });
  });

  test('should logout on logout click', async () => {
    const localStorageRemoveItem = jest.spyOn(localStorage, 'removeItem');
    renderProfile();

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => expect(localStorageRemoveItem).toBeCalledWith('token'));
    expect(mockedUseDispatch).toBeCalledWith({ payload: undefined, type: 'profile/removeUser' });
    expect(mockedUseNavigate).toBeCalledWith('/');
  });
});
