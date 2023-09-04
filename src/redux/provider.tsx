import { Provider } from 'react-redux';
import { ReactElement } from 'react';

import { store } from './store';

export const ReduxStoreProvider = ({ children }: { children: ReactElement }) => (
  <Provider store={store}>{children}</Provider>
);
