import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserSession } from '../hooks';
import { Header, Loader } from '../components';
import { LoaderContainer } from './SecureRoute.styles';

export const SecureRoute = ({ element }: { element: ReactElement }) => {
  const { isUserSessionActive } = useUserSession();

  if (isUserSessionActive === null)
    return (
      <LoaderContainer>
        <Loader $sizePX={100} />
      </LoaderContainer>
    );

  if (!isUserSessionActive) return <Navigate to="/" />;

  return (
    <>
      <Header />
      {element}
    </>
  );
};
