import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "./activity.css";

const ActivityCard = ({ imageUrl, heading, description }) => {
  return (
    <div className="relative rounded-xl overflow-hidden backdrop-blur-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img
          className="w-full h-70 object-cover transition duration-300 ease-in-out hover:brightness-50" // Black hover effect
          src={imageUrl}
          alt={heading}
        />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-transparent via-transparent to-white opacity-0 hover:opacity-40 transform rotate-180"></div>{" "}
        {/* Mirror effect */}
      </div>
      <div className="p-4">
        <div
          className="font-bold text-[5rem] bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(45deg, #f97316, #fbbf24)",
          }}
        >
          {heading}
        </div>

        <p className="text-gray-700 text-base mb-4">{description}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
