import React from 'react';
import './AnimatedStars.css'; // Make sure to import your CSS file

function AnimatedStars() {
  const starCount = 100; // Number of stars

  return (
    <div className="stars-container">
      {Array.from({ length: starCount }).map((_, index) => (
        <div
          key={index}
          className="star"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></div>
      ))}
    </div>
  );
}

export default AnimatedStars;
