import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from './components/dashboard/Layout';
import Home from './pages/Dashboard/Home';
import Settings from './pages/Dashboard/Settings';
import ProgressTracking from './pages/Dashboard/ProgressTracking';
import Help from './pages/Dashboard/Help';
import ProfilePage from "./pages/Dashboard/ProfilePage";
import UpdateActivity from "./pages/Dashboard/UpdateActivity";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {/* Nested Dashboard routes */}
      <Route index element={<Home />} />
      <Route path="activity" element={<UpdateActivity />} />
      <Route path="settings" element={<Settings />} />
      <Route path="progress-tracking" element={<ProgressTracking />} />
      <Route path="help" element={<Help />} />
      <Route path="profilepage" element={<ProfilePage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
