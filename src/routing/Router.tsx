import { HashRouter, Routes, Route } from 'react-router-dom';

import { LoginPage, ServersPage } from '../pages';
import { SecureRoute } from './SecureRoute';

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/servers" element={<SecureRoute element={<ServersPage />} />} />
    </Routes>
  </HashRouter>
);
