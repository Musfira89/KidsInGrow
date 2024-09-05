import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ProgressTracking = () => {
  // Dummy data for the graphs
  const month2Data = {
    labels: [
      'Communication',
      'Gross Motor',
      'Fine Motor',
      'Problem Solving',
      'Personal Social Interaction'
    ],
    datasets: [
      {
        label: 'Month 2 Progress',
        data: [30, 50, 40, 60, 35], // Example progress values
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Bar color
      }
    ]
  };

  const month4Data = {
    labels: [
      'Communication',
      'Gross Motor',
      'Fine Motor',
      'Problem Solving',
      'Personal Social Interaction'
    ],
    datasets: [
      {
        label: 'Month 4 Progress',
        data: [60, 70, 50, 80, 55], // Example progress values
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar color
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true, // Show legend to indicate which month the data represents
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Progress: ${tooltipItem.raw}%`;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false, // Allow chart to be resized
    scales: {
      x: {
        display: false // Hide x-axis category names
      },
      y: {
        beginAtZero: true,
        max: 100
      }
    },
    barThickness: 50 // Make bars thicker for a bolder appearance
  };

  return (
    <div className="min-h-screen w-[90%] bg-white p-4 sm:p-6 ml-20">
      <header className="bg-orange-400 text-white p-4 sm:p-6 rounded-lg shadow-lg mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col justify-center text-center sm:text-left">
          <p className="text-sm">HELLO!</p>
          <h1 className="text-2xl sm:text-3xl font-bold">CHILD Monthly Progress Tracking</h1>
          <p className="text-sm">Track and monitor your child's growth and progress through our detailed monthly reports!</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <img
            src="https://img.freepik.com/premium-photo/cartoon-digital-avatars-organized-focused-student-sitting-their-desk-with-neatly_216520-16337.jpg"
            alt="Logo"
            className="w-full max-w-sm object-cover"
          />
        </div>
      </header>

      <main className="p-4 sm:p-6 mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800">Progress Tracking Overview</h2>
          <p className="text-sm text-gray-600">Compare your child's progress from Month 2 to Month 4.</p>
        </div>

        <div className="flex justify-around">
          {/* Month 2 Progress Graph */}
          <div className="mb-8 w-[45%]">
            <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">Month 2 Progress</h3>
            <div className="h-80">
              <Bar data={month2Data} options={chartOptions} />
            </div>
          </div>

          {/* Month 4 Progress Graph */}
          <div className="w-[45%]">
            <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">Month 4 Progress</h3>
            <div className="h-80">
              <Bar data={month4Data} options={chartOptions} />
            </div>
          </div>
        </div>

 {/* Progress Comparison */}
<div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
  <h3 className="text-xl font-bold text-gray-800 mb-4">Progress Comparison</h3>
  <p className="text-base text-gray-700 mb-4">
    Your child has shown significant improvement in several areas, particularly in Communication and Gross Motor skills. The following comparisons highlight the growth:
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Replace with actual charts or visual representations */}
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <h4 className="text-md font-semibold text-gray-700">Communication</h4>
      <div className="flex items-center mt-2">
        <div className="w-2/3 h-4 bg-green-400 rounded-full" style={{ width: '60%' }}></div>
        <div className="ml-2 text-gray-600">30% → 60%</div>
      </div>
    </div>
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <h4 className="text-md font-semibold text-gray-700">Gross Motor</h4>
      <div className="flex items-center mt-2">
        <div className="w-2/3 h-4 bg-blue-400 rounded-full" style={{ width: '70%' }}></div>
        <div className="ml-2 text-gray-600">50% → 70%</div>
      </div>
    </div>
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <h4 className="text-md font-semibold text-gray-700">Fine Motor</h4>
      <div className="flex items-center mt-2">
        <div className="w-2/3 h-4 bg-yellow-400 rounded-full" style={{ width: '50%' }}></div>
        <div className="ml-2 text-gray-600">40% → 50%</div>
      </div>
    </div>
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <h4 className="text-md font-semibold text-gray-700">Problem Solving</h4>
      <div className="flex items-center mt-2">
        <div className="w-2/3 h-4 bg-red-400 rounded-full" style={{ width: '80%' }}></div>
        <div className="ml-2 text-gray-600">60% → 80%</div>
      </div>
    </div>
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <h4 className="text-md font-semibold text-gray-700">Personal Social Interaction</h4>
      <div className="flex items-center mt-2">
        <div className="w-2/3 h-4 bg-purple-400 rounded-full" style={{ width: '55%' }}></div>
        <div className="ml-2 text-gray-600">35% → 55%</div>
      </div>
    </div>
  </div>
</div>

      </main>
    </div>
  );
};

export default ProgressTracking;
