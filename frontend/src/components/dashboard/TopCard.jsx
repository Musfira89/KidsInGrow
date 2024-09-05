// Dashboard.js
import React from 'react';
import profile from '../../assets/bg.png';

const Dashboard = () => {
  // Fetch the username from local storage or state
  const username = localStorage.getItem('username');

  return (
    <div className="bg-gradient-to-r from-blue-950 to-white text-white rounded-2xl p-6 flex items-center justify-between shadow-lg mb-6" style={{ minHeight: '200px', width: '100%' }}>
      {/* Greeting and description */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Hi, {username}!</h2>
        <p className="text-md mt-2" style={{ fontFamily: 'Arial, sans-serif' }}>
          Welcome back! Here’s what you can do today. Start by reviewing your reports or exploring new activities.
        </p>
      </div>
      
      {/* Image on the right side */}
      <div className="flex-shrink-0 ml-6">
        <img
          src={profile} // Image source passed as a prop
          alt="Profile Icon"
          className="h-40 w-50 rounded-md object-cover" // Adjusted size and style
        />
      </div>
    </div>
  );
};

export default Dashboard;
