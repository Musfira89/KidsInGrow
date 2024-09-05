// src/components/Activity.jsx
import React from 'react';
import ActivityList from './ActivityList';

const Activity = ({ buttonLabels }) => {
  return (
    <div className="min-h-screen bg-white-100 p-6">
      {/* Navigation Bar */}
      <header className="bg-orange-400 text-white p-6 rounded-lg shadow-lg mx-auto max-w-7xl h-45 flex items-center justify-between">
        <div className="flex flex-col justify-center h-full">
          <p className="text-sm">HELLO!</p>
          <h1 className="text-3xl font-bold">CHILD ACTIVITIES SECTION</h1>
          <p className="text-sm">Always stay engaged with our fun and educational child activities!</p>
        </div>
        <div className="h-full">
          <img
            src="https://carpetmilloutletstores.com/wp-content/uploads/2019/01/CMO_FB_little-girl-toys.jpg"
            alt="Logo"
            className="h-[200px] w-[700px] object-cover"
          />
        </div>
      </header>

      <ActivityList buttonLabels={buttonLabels} />
    </div>
  );
};

export default Activity;
