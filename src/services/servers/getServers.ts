import { ServerType } from '../../types';

export const getServers = async (): Promise<ServerType[]> => {
  const storageToken = localStorage.getItem('token');

  const result = fetch('https://playground.tesonet.lt/v1/servers', {
    headers: {
      Authorization: `Bearer ${storageToken}`,
    },
  }).then(async (result) => {
    const res = await result.json();
    return res;
  });

  return result;
};
