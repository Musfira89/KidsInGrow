import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Added `useNavigate` for navigation

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const ProgressTracking = () => {
  const { childId } = useParams();
  const [graphData, setGraphData] = useState({});
  const [months, setMonths] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const navigate = useNavigate(); // Use for navigation

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/progress-tracking/${childId}`
        );
        if (response.data && response.data.groupedData) {
          setGraphData(response.data.groupedData);
          const fetchedMonths = Object.keys(response.data.groupedData);
          setMonths(fetchedMonths);

          // Comparing the last two filled months
          if (fetchedMonths.length >= 2) {
            const secondLastMonthData =
              response.data.groupedData[
                fetchedMonths[fetchedMonths.length - 2]
              ];
            const lastMonthData =
              response.data.groupedData[
                fetchedMonths[fetchedMonths.length - 1]
              ];

            const comparison = Object.keys(secondLastMonthData).map(
              (skill, index) => ({
                skill,
                secondLastMonth: secondLastMonthData[skill],
                lastMonth: lastMonthData[skill],
                improvement: lastMonthData[skill] - secondLastMonthData[skill],
                color: getColorByIndex(index), // Get vibrant colors for each skill
              })
            );

            setComparisonData(comparison);
          }
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgressData();
  }, [childId]);

  // Function to generate light aesthetic colors based on the index
  const getColorByIndex = (index) => {
    const colors = [
      "#FFB6C1",
      "#ADD8E6",
      "#90EE90",
      "#FFD700",
      "#FF6347",
      "#AFEEEE",
    ]; // Soft pastel colors
    return colors[index % colors.length];
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Progress: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { beginAtZero: true, max: 100 },
    },
    barThickness: 50,
  };

  // Navigation handler for the activities page
  const handleViewActivitiesClick = () => {
    navigate(`/activities/${childId}`); // Assumed route for the activities page
  };

  return (
    <div className="min-h-screen w-[90%] bg-white p-4 sm:p-6 ml-20">
      <header className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-16 sm:p-12 rounded-lg shadow-lg mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col justify-center text-center sm:text-left">
          <p className="text-lg">WELCOME!</p>
          <h1 className="text-4xl sm:text-4xl font-bold tracking-wide">
            CHILD Monthly Progress Tracking
          </h1>
        </div>
      </header>

      <main className="p-4 sm:p-6 mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Progress Tracking Overview
          </h2>{" "}
          {/* Increased heading font size */}
          <p className="text-base text-gray-700">
            Compare your child's progress across months.
          </p>{" "}
          {/* Increased paragraph font size */}
        </div>

                {/* Progress Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {months.length > 0 ? (
            months.map((month, index) => (
              <div key={index} className="mb-8 w-full">
                <h3 className="text-xl font-semibold text-gray-700 text-center mb-2">{`Month ${month} Progress`}</h3>{" "}
                <div className="h-80">
                  <Bar
                    data={{
                      labels: Object.keys(graphData[month]),
                      datasets: [
                        {
                          label: `Month ${month} Progress`,
                          data: Object.values(graphData[month]),
                          backgroundColor: "rgba(255, 99, 132, 0.5)", // Pink bar color
                        },
                      ],
                    }}
                    options={chartOptions}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No progress data available.</p>
          )}
        </div>

        {/* Progress Comparison */}
        {comparisonData.length > 0 && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Progress Comparison
            </h3>{" "}
            {/* Consistent heading style */}
            <p className="text-base text-gray-700 mb-4">
              Comparing progress between Month {months[months.length - 2]} and
              Month {months[months.length - 1]}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {comparisonData.map((data, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg shadow-inner"
                >
                  <h4 className="text-md font-semibold text-gray-700">
                    {data.skill}
                  </h4>
                  <div className="flex items-center mt-2">
                    <div
                      className="w-2/3 h-4 rounded-full"
                      style={{
                        width: `${data.lastMonth}%`,
                        backgroundColor: data.color, // Soft pastel color for comparison bars
                      }}
                    ></div>
                    <div className="ml-2 text-gray-600">
                      {data.secondLastMonth}% → {data.lastMonth}%
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Improvement: {data.improvement}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Updated Additional Elements for Parents */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Tips for Parents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Encouragement Item */}
            <div className="flex items-start bg-white p-4 rounded-lg shadow-md">
              <div className="mr-4 text-purple-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c1.657 0 3 1.343 3 3m0 0c0 1.657-1.343 3-3 3m0-6a3 3 0 100 6m0-6V6m0 0H6m6-2h6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Encourage Daily Practice
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Incorporate daily activities to boost skills that need
                  improvement.
                </p>
              </div>
            </div>

            {/* Monitor Behavior Changes */}
            <div className="flex items-start bg-white p-4 rounded-lg shadow-md">
              <div className="mr-4 text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m0 0v3m0-3v-3m6 12V9m-2-2a9 9 0 10-18 0v12"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Monitor Behavior Changes
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Pay attention to sudden progress changes and adjust routines
                  if needed.
                </p>
              </div>
            </div>

            {/* Reward Progress */}
            <div className="flex items-start bg-white p-4 rounded-lg shadow-md">
              <div className="mr-4 text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1v-4h-1V8m0-2h4m0 0H8m0 0v4m0 4v4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Reward Progress
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Use small rewards to motivate your child for significant
                  improvements.
                </p>
              </div>
            </div>

            {/* Consult with Educators */}
            <div className="flex items-start bg-white p-4 rounded-lg shadow-md">
              <div className="mr-4 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h10M7 16h10"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Consult with Educators
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Share progress with educators to get additional insights and
                  advice.
                </p>
              </div>
            </div>

            {/* Set Future Goals */}
            <div className="flex items-start bg-white p-4 rounded-lg shadow-md">
              <div className="mr-4 text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 7h2a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h2m4 0v3m-2-3h2v3h-2m2 3v3h-2v-3h2m2-3v3h-2V7h2"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Set Future Goals
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Use current progress to set achievable goals for the coming
                  months.
                </p>
              </div>
            </div>
          </div>

          {/* View Recommended Activities Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleViewActivitiesClick}
              className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-600 shadow-lg transition-all transform hover:scale-105"
            >
              View Recommended Activities
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressTracking;
