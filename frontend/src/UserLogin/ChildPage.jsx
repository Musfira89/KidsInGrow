

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from "../assets/kidsbg.jpg";
import logo from "../assets/logo.png";

import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";

const ChooseChild = () => {
  const { parentId } = useParams(); // Extract parentId from route params
  const navigate = useNavigate(); // For navigation
  const [children, setChildren] = useState([]); // State to hold children data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/children/parent/${parentId}`);
        console.log('Children response:', response.data);
        setChildren(response.data);
      } catch (error) {
        console.error('Error fetching children:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [parentId]);

  const handleSelectChild = (childId) => {
    navigate(`/dashboard/${parentId}/${childId}`); // Navigate to child's dashboard
  };

  if (loading) {
    return <p>Loading children profiles...</p>; // Show loading state
  }

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center relative group"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 transition duration-300 ease-in-out"></div>

      {/* Top Section */}
      <div className="absolute top-0 left-0 w-full bg-blue-950 bg-opacity-100 shadow-md p-4 z-10">
        <div className="flex justify-center items-center">
          <img src={logo} alt="Logo" className="h-12 mr-4" />
          <h1 className="text-4xl font-extrabold text-white text-center mb-2">
            Select a Child Profile
          </h1>
        </div>
      </div>

      {/* Profiles Container */}
      <div className="container mx-auto p-8 pt-32 relative z-10">
        <div className="bg-blue-950 bg-opacity-90 rounded-lg p-6 w-full">
          {children?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {children.map((child) => (
                <div
                  key={child.child_id}
                  className={`bg-white rounded-lg p-4 mx-auto border-r-8 ${child.status === 'active' ? 'border-r-green-500' : 'border-r-orange-500'}`}
                >
                  <button
                    onClick={() => handleSelectChild(child.child_id)}
                    className="bg-white text-black font-semibold py-4 px-6 rounded-lg w-full flex flex-col items-center"
                    aria-label={`Select ${child.babyName}`}
                  >
                    <PersonIcon className="text-blue-950 text-4xl mb-2" />
                    <span className="text-lg font-bold">
                      {child.babyName} {child.babyLastName}
                    </span>
                    <hr className="border-t-2 w-full mt-2 mb-2" />
                    <div className="text-sm">
                      <CalendarTodayIcon className="text-gray-400 mr-1" />
                      <span>Date of Birth: {new Date(child.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="text-sm mt-1">
                      <PeopleIcon className="text-gray-400 mr-1" />
                      <span>Assisting People: {child.assistingPeople}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No child profiles found for this parent.</p>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/childform')}
            className="bg-blue-950 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition ease-in-out"
            aria-label="Create Another Child"
          >
            Create Another Child
          </button>
        </div>
      </div>

    </div>
  );



};
export default ChooseChild;
