// src/components/ActivityCard.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import activity1 from '../../../assets/activity1.mp4';
import activity2 from '../../../assets/activity2.mp4'; // Import the second video

const ActivityCard = () => {
  const { ageRange, activityId } = useParams();

  // Data for activities
  const activities = {
    1: {
      title: 'Activity 1',
      description: 'Detailed description of Activity 1.',
      videoUrl: activity1,
      imageUrl: 'https://images.ctfassets.net/6m9bd13t776q/4sWzWXCe1msKPfu1uNlMZj/01364e8847272028fdd47917380f65ff/Building-Toys-Hero.png?q=80'
    },
    2: {
      title: 'Activity 2',
      description: 'Detailed description of Activity 2.',
      videoUrl: activity2,
      imageUrl: 'https://images.ctfassets.net/6m9bd13t776q/4sWzWXCe1msKPfu1uNlMZj/01364e8847272028fdd47917380f65ff/Building-Toys-Hero.png?q=80'
    }
  };

  // Select the activity based on the activityId from the URL
  const activity = activities[activityId];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <Link to={`/activity/${ageRange}`} className="text-gray-700 mb-4 block">Back to Activities</Link>
        <img src={activity.imageUrl} alt={activity.title} className="mb-4" />
        <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
        <p>{activity.description}</p>
        <a href={activity.videoUrl} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Watch Video</a>
      </div>
    </div>
  );
};

export default ActivityCard;
