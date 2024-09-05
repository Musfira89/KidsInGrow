import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '../../components/dashboard/ProfileCard';
import Cards from '../../components/dashboard/Cards/Cards';
import Graph from '../../components/dashboard/Graph/Graph';
import Bot from '../../components/dashboard/ChatBot/Bot';
import Dashboard from '../../components/dashboard/TopCard';

const Home = () => {
  const { childId } = useParams(); // Get childId from URL

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-6 px-4 lg:px-8 h-full">
      {/* Flexbox for stacking vertically on small screens, horizontally on larger screens */}
      
      <div className="flex-1 lg:flex-[1] flex flex-col gap-6 ml-8">
        <Dashboard username="Your Name" /> {/* Greeting Card */}
        <Cards childId={childId} /> {/* Cards at the top */}
        <Graph /> {/* Graph directly beneath the cards */}
      </div>
      
      {/* Right Section: Profile Card */}
      <div className="w-full lg:w-1/4">
        {/* Full width on small screens, 25% on large screens */}
        <ProfileCard className="h-full" /> {/* Profile card takes full height */}
      </div>
      <Bot />
    </div>
    
  );
};

export default Home;
