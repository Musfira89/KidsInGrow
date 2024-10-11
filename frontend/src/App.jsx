// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './UserLogin/Login';
import Signup from './UserLogin/Signup';
import ChildForm from './UserLogin/ChildForm';
import Home from './LandingPage/Home';
import AuthProvider from './Context/AuthContext';
import ProfileProvider from './Context/ProfileContext';
import ChooseMonth from './components/dashboard/Cards/Assessment/ChooseMonth';
import Questions from './components/dashboard/Cards/Assessment/Questions';
import Report from './components/dashboard/Cards/ViewReport/Report';
import AdminPanel from './AdminPanel/AdminPanel';
import AppRoutes from './routes';
import AdminLogin from './AdminPanel/AdminLogin/AdminLogin';
import Help from './pages/Dashboard/Help';
import ProgressTracking from './pages/Dashboard/ProgressTracking';
import ActivityList from './pages/Dashboard/Activity/ActivityList';
import ActivityDetails from './pages/Dashboard/Activity/Activitydetails';
import ActivityCard from './pages/Dashboard/Activity/ActivityCard';
import Activity from './pages/Dashboard/Activity/Activity';
import ActivityRoutes from './pages/Dashboard/Activity/ActivityRoutes';
import MonthReport from './components/dashboard/Cards/ViewReport/MonthReport';


function App() {
  const buttonLabels = [
    '1-4 Months',
    '4-8 Months',
    '8-12 Months',
    '12-16 Months',
    '16-20 Months',
    '20-24 Months',
    '24-30 Months',
    '30-36 Months',
    '36-48 Months',
    '48-60 Months',
    '60-66 Months',
    '66-78 Months'
  ];

  return (
    <AuthProvider>
      <ProfileProvider>

        <Router>
          <Routes>
            {/* Landing Page Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/childform" element={<ChildForm />} />

            {/* User Dashboard Routes */}
            <Route path="/dashboard/:childId/*" element={<AppRoutes />} />
            <Route path="/choosemonth/:childId" element={<ChooseMonth />} />
            <Route path="/dashboard/:childId/month/:month/category/:category" element={<Questions />} />
            <Route path="/view-report/:childId" element={<Report />} />
            <Route path="/view-report/:childId/:month" element={<MonthReport />} />

            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-panel" element={<AdminPanel />} />

            {/* Pages Dashboard Routes */}
            <Route path="/progress-tracking/:childId" element={<ProgressTracking />} />
            <Route path="/help" element={<Help />} />

            <Route path="/view-activities" element={<Activity buttonLabels={buttonLabels} />} />
            <Route path="/*" element={<ActivityRoutes buttonLabels={buttonLabels} />} />
            <Route path="/" element={<ActivityList buttonLabels={buttonLabels} />} />
            <Route path="/activity/:ageRange" element={<ActivityDetails />} />
            <Route path="/activity/:ageRange/:activityId" element={<ActivityCard />} />
          </Routes>
          <ToastContainer />
        </Router>

      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
