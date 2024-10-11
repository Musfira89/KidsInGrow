import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from './components/dashboard/Layout';
import Home from './pages/Dashboard/Home';
import Settings from './pages/Dashboard/Settings';
import ProgressTracking from './pages/Dashboard/ProgressTracking';
import Help from './pages/Dashboard/Help';
import ProfilePage from "./pages/Dashboard/ProfilePage";
// import ActivityRoutes from "./pages/Dashboard/Activity/ActivityRoutes";
import UpdateActivity from "./pages/Dashboard/UpdateActivity";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
    {/* Dashboard routes */}
    <Route index element={<Home />} />
      <Route path="activity/:childId" element={<UpdateActivity />} />
      <Route path="settings/:childId" element={<Settings />} />
      <Route path="progress-tracking/:childId" element={<ProgressTracking />} />
      <Route path="help/:childId" element={<Help />} />
      <Route path="profilepage/:childId" element={<ProfilePage />} />

    </Route>
  </Routes>
);

export default AppRoutes;
