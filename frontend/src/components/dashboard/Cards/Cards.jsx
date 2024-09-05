import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegFileAlt, FaEdit, FaTasks, FaChartBar } from 'react-icons/fa';

const cardData = (childId) => [
  {
    title: 'View Report',
    icon: <FaRegFileAlt className="text-yellow-300 text-3xl" />,
    borderColor: 'border-yellow-300',
    link: `/view-report/${childId}`,
  },
  {
    title: 'Start Assessment',
    icon: <FaEdit className="text-orange-300 text-3xl" />,
    borderColor: 'border-green-600',
    link: `/choosemonth/${childId}`,
  },
  {
    title: 'View Activities',
    icon: <FaTasks className="text-yellow-300 text-3xl" />,
    borderColor: 'border-yellow-300',
    link: '/view-activities',
  },
  {
    title: 'Progress Tracking',
    icon: <FaChartBar className="text-orange-400 text-3xl" />,
    borderColor: 'border-orange-400',
    link: '/analytics',
  },
];

const Card = ({ title, icon, borderColor, link }) => (
  <Link to={link} className={`border-x-8 ${borderColor} bg-white shadow-lg rounded-2xl  p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl`} aria-label={title}>
    <div className="mb-4">{icon}</div>
    <h3 className="text-md font-semibold text-gray-700" style={{ fontFamily: 'Arial' }}>{title}</h3>
  </Link>
);

const Cards = ({ childId }) => (
  <div className="grid grid-cols-2 gap-6">
    {cardData(childId).map((card, index) => (
      <Card key={index} {...card} className="aspect-w- aspect-h-1" />
    ))}
  </div>
);

export default Cards;
