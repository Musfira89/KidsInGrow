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

import MonthReport from './components/dashboard/Cards/ViewReport/MonthReport';
import UpdateActivity from './pages/Dashboard/UpdateActivity';
import ChildPage from './UserLogin/ChildPage';



function App() {

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
            <Route path="/dashboard/:parentId/:childId/*" element={<AppRoutes />} />
            <Route path="/choosemonth/:parentId/:childId" element={<ChooseMonth />} />
            <Route path="/dashboard/:parentId/:childId/month/:month/category/:category" element={<Questions />} />
            <Route path="/view-report/:parentId/:childId" element={<Report />} />
            <Route path="/view-report/:parentId/:childId/:month" element={<MonthReport />} />


            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-panel" element={<AdminPanel />} />

            {/* Pages Dashboard Routes */}
            <Route path="/progress-tracking/:parentId/:childId" element={<ProgressTracking />} />
            <Route path="/help" element={<Help />} />
            <Route path="activity/:parentId/:childId" element={<UpdateActivity />} />
          </Routes>
          <ToastContainer />
        </Router>

      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
