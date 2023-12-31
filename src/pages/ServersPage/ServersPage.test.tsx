import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import 'jest-styled-components';

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
  { name: 'Germany', distance: 711 },
  { name: 'Third', distance: 123 },
  { name: 'Japan', distance: 1213 },
  { name: 'Japan', distance: 123 },
];

describe('<ServersPage />', () => {
  beforeEach(async () => {
    (getServers as jest.Mock).mockReturnValue(LIST_OF_SERVERS);
  });
  afterEach(async () => {
    (getServers as jest.Mock).mockClear();
  });

  test('renders loader, description and no servers message', async () => {
    (getServers as jest.Mock).mockReturnValue([]);
    renderServersPage();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('servers-page')).toHaveTextContent(/list of all available servers/i);
    await waitFor(() => expect(screen.getByTestId('servers-page')).toHaveTextContent(/No available servers/i));
    expect(screen.getByTestId('servers-page')).toMatchSnapshot();
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
    expect(screen.getByTestId('servers-page')).toMatchSnapshot();

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
  test('should filter by country', async () => {
    renderServersPage();

    const flagsContainer = await screen.findByTestId('country-flags');

    // Select 1 country
    fireEvent.click(flagsContainer.children[2]);

    const serversList = await screen.findByTestId('servers-list');

    expect(serversList.children).toHaveLength(1);
    expect(serversList.children[0]).toHaveTextContent(LIST_OF_SERVERS[0].name);

    // Deselect 1 country
    fireEvent.click(flagsContainer.children[2]);

    expect(serversList.children).toHaveLength(LIST_OF_SERVERS.length);

    // Select 2 countries
    fireEvent.click(flagsContainer.children[2]);
    fireEvent.click(flagsContainer.children[3]);

    expect(serversList.children).toHaveLength(3);

    // Clear selected countries
    fireEvent.click(flagsContainer.children[4]);

    expect(serversList.children).toHaveLength(LIST_OF_SERVERS.length);
  });
});
