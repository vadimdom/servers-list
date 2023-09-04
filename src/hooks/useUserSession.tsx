import { useState, useEffect } from 'react';

import { useAppDispatch, setUser } from '../redux';

export const useUserSession = () => {
  const dispatch = useAppDispatch();

  const [isUserSessionActive, setIsUserSessionActive] = useState<boolean | null>(null);

  useEffect(() => {
    const storageToken = localStorage.getItem('token');

    if (storageToken) {
      setIsUserSessionActive(true);
      dispatch(setUser({ name: 'tesonet' }));
    } else {
      setIsUserSessionActive(false);
    }
  }, [dispatch]);

  return { isUserSessionActive };
};
