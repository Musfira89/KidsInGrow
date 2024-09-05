// src/components/ActivityDetails.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import BgImage from '../../../assets/bg6.jpg';

const ActivityDetails = () => {
  const { ageRange } = useParams();
  const activities = [
    { id: 1, title: 'Activity 1' },
    { id: 2, title: 'Activity 2' },
    // Add more activities as needed
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center" 
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="max-w-6xl mx-auto p-4 bg-white bg-opacity-75 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black">{ageRange} Activities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {activities.map(activity => (
            <Link
              key={activity.id}
              to={`/activity/${ageRange}/${activity.id}`}
              className="block bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="h-full flex flex-col justify-between">
                <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
                <p className="text-gray-600">Click to view details</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
