import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ServersPage } from './ServersPage';
import { ThemeProvider } from '../../theme';
import { getServers } from '../../services';

jest.mock('../../services');

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

const renderServersPage = () => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <ServersPage />
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
const LIST_OF_SERVERS = [
  { name: 'First', distance: 711 },
  { name: 'Third', distance: 123 },
  { name: 'Second', distance: 1213 },
  { name: 'Second', distance: 123 },
];

describe('<ServersPage />', () => {
  beforeEach(async () => {
    (getServers as jest.Mock).mockReturnValue(LIST_OF_SERVERS);
  });

  test('renders loader, description and no servers message', async () => {
    (getServers as jest.Mock).mockReturnValue([]);
    renderServersPage();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('servers-page')).toHaveTextContent(/list of all available servers/i);
    await waitFor(() => expect(screen.getByTestId('servers-page')).toHaveTextContent(/No available servers/i));
  });
  test('renders correct amount of servers', async () => {
    (getServers as jest.Mock).mockReturnValue([LIST_OF_SERVERS[0]]);
    renderServersPage();

    const serversList = await screen.findByTestId('servers-list');
    expect(serversList.children).toHaveLength(1);
  });
  test('should sort by server name', async () => {
    renderServersPage();

    const sortByNameButton = await screen.findByTestId('sort-by-name');

    fireEvent.click(sortByNameButton);

    const serversList = await screen.findByTestId('servers-list');

    expect(serversList.children).toHaveLength(LIST_OF_SERVERS.length);
    expect(serversList.children[0]).toHaveTextContent(LIST_OF_SERVERS[0].name);
    expect(serversList.children[1]).toHaveTextContent(LIST_OF_SERVERS[2].name);
    expect(serversList.children[2]).toHaveTextContent(LIST_OF_SERVERS[3].name);
    expect(serversList.children[3]).toHaveTextContent(LIST_OF_SERVERS[1].name);

    fireEvent.click(sortByNameButton);
    expect(serversList.children[0]).toHaveTextContent(LIST_OF_SERVERS[1].name);
    expect(serversList.children[1]).toHaveTextContent(LIST_OF_SERVERS[2].name);
    expect(serversList.children[2]).toHaveTextContent(LIST_OF_SERVERS[3].name);
    expect(serversList.children[3]).toHaveTextContent(LIST_OF_SERVERS[0].name);
  });
  test('should sort by server distance', async () => {
    renderServersPage();

    const sortByDistanceButton = await screen.findByTestId('sort-by-distance');

    fireEvent.click(sortByDistanceButton);

    const serversList = await screen.findByTestId('servers-list');

    expect(serversList.children).toHaveLength(LIST_OF_SERVERS.length);
    expect(serversList.children[0]).toHaveTextContent(LIST_OF_SERVERS[1].name);
    expect(serversList.children[1]).toHaveTextContent(LIST_OF_SERVERS[3].name);
    expect(serversList.children[2]).toHaveTextContent(LIST_OF_SERVERS[0].name);
    expect(serversList.children[3]).toHaveTextContent(LIST_OF_SERVERS[2].name);

    fireEvent.click(sortByDistanceButton);
    expect(serversList.children[0]).toHaveTextContent(LIST_OF_SERVERS[2].name);
    expect(serversList.children[1]).toHaveTextContent(LIST_OF_SERVERS[0].name);
    expect(serversList.children[2]).toHaveTextContent(LIST_OF_SERVERS[1].name);
    expect(serversList.children[3]).toHaveTextContent(LIST_OF_SERVERS[3].name);
  });
});
