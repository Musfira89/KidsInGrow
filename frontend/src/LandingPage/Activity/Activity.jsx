import React, { useState } from "react";
import { activities } from "./constant.js";
import ActivityCard from "./ActivityCard";
import './activity.css';

const Activity = () => {
  const [showAll, setShowAll] = useState(false);

  const handleViewMore = () => {
    setShowAll(true);
  };

  const handleViewLess = () => {
    setShowAll(false);
  };

  return (
    <div className="relative text-center pt-24 bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}> {/* Background image assigned */}
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="particle absolute bg-white opacity-10 rounded-full"
            style={{
              width: `${Math.random() * 7 + 5}px`,
              height: `${Math.random() * 7 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-2xl lg:text-5xl font-bold mb-6 text-center text-gray-800">
          ACTIVITY
          <span className="text-blue-500"> CARDS</span>
        </h2>
        <p className="text-gray-600 mb-8 text-center text-lg">
          Explore a variety of engaging activities to support your child's
          development
        </p>

        {/* Cards */}
        <div className="flex flex-wrap justify-center items-center pb-36 pt-16 gap-4">
          {(showAll ? activities : activities.slice(0, 3)).map((activity, index) => (
            <div
              key={activity.id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4"
            >
              <ActivityCard
                imageUrl={activity.imageUrl}
                heading={activity.heading}
                description={activity.description}
              />
            </div>
          ))}
          {/* Toggle Button */}
          {showAll ? (
            <div className="w-full text-center mt-5">
              <button
                onClick={handleViewLess}
                className="bg-yellow-400 text-white font-bold py-4 px-12 rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out"
              >
                View Less
              </button>
            </div>
          ) : (
            <div className="w-full text-center mt-5">
              <button
                onClick={handleViewMore}
                className="bg-yellow-400 text-white font-bold py-4 px-12 rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
