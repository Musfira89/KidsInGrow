import React, { useState } from 'react';
import { FaPlay, FaHeart } from 'react-icons/fa'; // Added Heart icon
import activity1 from '../../assets/activity1.mp4';
import activity2 from '../../assets/activity2.mp4'; 
import activity3 from '../../assets/activity2.mp4'; 
import activity4 from '../../assets/activity2.mp4'; 
import img1 from '../../assets/activity.png';
import img2 from '../../assets/bgp1.jpg';
import img3 from '../../assets/bgquest.jpg';
import img4 from '../../assets/bg6.jpg';

const UpdateActivity = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [likedActivities, setLikedActivities] = useState({}); // Track liked activities

  const activities = [
    {
      image: img1,
      heading: 'Activity 1',
      description: 'Description of activity 1 goes here. It explains what the activity is about.',
      videoLink: activity1,
    },
    {
      image: img2,
      heading: 'Activity 2',
      description: 'Description of activity 2 goes here. It explains what the activity is about.',
      videoLink: activity2,
    },
    {
      image: img3,
      heading: 'Activity 3',
      description: 'Description of activity 3 goes here. It explains what the activity is about.',
      videoLink: activity3,
    },
    {
      image: img4,
      heading: 'Activity 4',
      description: 'Description of activity 4 goes here. It explains what the activity is about.',
      videoLink: activity4,
    },
  ];

  const toggleLike = (index) => {
    setLikedActivities((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const openModal = (video) => {
    setCurrentVideo(video);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div className="min-h-screen w-[90%] bg-white p-4 sm:p-6 ml-20">

      {/* Header Section */}
      <header className="bg-gradient-to-r bg-blue-950  text-white p-16 sm:p-12 rounded-lg shadow-lg mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col justify-center text-center sm:text-left">
          <p className="text-lg">WELCOME!</p>
          <h1 className="text-4xl sm:text-4xl font-bold tracking-wide">Child Suggested Activities</h1>
        </div>
      </header>

      {/* Cards Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="bg-white w-[100%] max-w-xs mx-auto rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 relative"
            style={{ padding: '25px' }}
          >
            <div className="relative">
              <img
                src={activity.image}
                alt={activity.heading}
                className="w-full h-44 object-cover rounded-md"
              />
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-50 rounded-md"
                onClick={() => openModal(activity.videoLink)}
              >
                <FaPlay className="text-white text-4xl bg-black bg-opacity-60 p-3 rounded-full transition-transform duration-200 hover:scale-110" />
              </div>
              {/* Red Heart Icon */}
              <div
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg cursor-pointer transition-transform transform hover:scale-110"
                onClick={() => toggleLike(index)}
              >
                <FaHeart
                  className={`text-2xl ${
                    likedActivities[index] ? 'text-red-500' : 'text-gray-400'
                  }`}
                />
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-900">{activity.heading}</h2>
              <p className="mt-3 text-gray-600 text-base leading-relaxed">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl w-[80%] sm:w-[50%] p-6">
            <button className="absolute top-2 right-2 text-gray-600 text-3xl font-bold" onClick={closeModal}>
              &times;
            </button>
            <video src={currentVideo} controls className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateActivity;
