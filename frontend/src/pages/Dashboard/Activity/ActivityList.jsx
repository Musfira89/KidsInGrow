// src/components/ActivityList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ActivityList = ({ buttonLabels }) => {
  return (
    <main className="max-w-6xl mx-auto mt-8 p-4 h-full">
      <h2 className="text-3xl font-bold mb-4 text-center">Activities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-transparent p-6 rounded-lg">
        {buttonLabels.map((label, index) => (
          <Link
            key={index}
            to={`/activity/${label}`}
            className="bg-orange-500 text-white text-lg p-4 rounded-lg shadow-lg flex justify-center items-center border-2 border-teal-500 hover:bg-teal-600 transition duration-300 transform hover:scale-105"
          >
            {label}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ActivityList;
