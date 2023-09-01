import { useState, useEffect } from 'react';

export const useUserSession = () => {
  const [isUserSessionActive, setIsUserSessionActive] = useState<boolean | null>(null);

  useEffect(() => {
    const storageToken = localStorage.getItem('token');

    if (storageToken) {
      setIsUserSessionActive(true);
    } else {
      setIsUserSessionActive(false);
    }
  }, []);

  return { isUserSessionActive };
};
