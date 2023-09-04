import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserSession } from '../hooks';
import { Header, Loader } from '../components';

export const SecureRoute = ({ element }: { element: ReactElement }) => {
  const { isUserSessionActive } = useUserSession();

  if (isUserSessionActive === null) return <Loader $sizePX={100} />;

  if (!isUserSessionActive) return <Navigate to="/" />;

  return (
    <>
      <Header />
      {element}
    </>
  );
};
