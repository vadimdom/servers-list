import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginPage, ServersPage } from './pages';

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/servers" element={<ServersPage />} />
    </Routes>
  </Router>
);
