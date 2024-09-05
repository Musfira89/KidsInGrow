// src/components/ActivityRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ActivityList from './ActivityList';
import ActivityCard from './ActivityCard';
import ActivityDetails from './Activitydetails';

const ActivityRoutes = ({ buttonLabels }) => {
  return (
    <Routes>
      <Route path="/" element={<ActivityList buttonLabels={buttonLabels} />} />
      <Route path="/activity/:ageRange" element={<ActivityDetails />} />
      <Route path="/activity/:ageRange/:activityId" element={<ActivityCard />} />
    </Routes>
  );
};

export default ActivityRoutes;
