export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{ message?: string; token?: string }> => {
  const result = fetch('https://playground.tesonet.lt/v1/tokens ', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(async (result) => {
    const res = await result.json();
    return res;
  });

  return result;
};
